// SSLCommerz client — hand-authored for smartbidda (Bangladeshi PG, BDT/poisha).
// The engine's scaffold-payment-module only knows TossPayments and declines any other
// provider, so this adapter is written by hand and deliberately carries NO generation
// marker: it must never be overwritten by a scaffold re-run.
//
// Three calls, in the order the money moves:
//   1. sessionStart  — POST /gwprocess/v4/api.php       → GatewayPageURL (redirect the parent)
//   2. validate      — GET  /validator/api/validationserverAPI.php (val_id)
//                      The IPN handler ALSO validates; the client never trusts a redirect
//                      query alone, because `status=VALID` in a browser URL is spoofable.
//   3. refund        — POST /postrefund/api/postrefund.php (compensating refund)
//
// Amounts cross the boundary in BDT with two decimals (SSLCommerz's unit); we store poisha
// (integers). Conversion happens ONLY here, never in a service or a controller.
import { Injectable, Logger } from '@nestjs/common';

const SANDBOX = 'https://sandbox.sslcommerz.com';
const LIVE = 'https://securepay.sslcommerz.com';

export interface SslcommerzSessionInput {
  tranId: string;
  amountBdt: string;
  cusName: string;
  cusEmail: string;
  cusPhone: string;
  cusAddress: string;
  productName: string;
  productCategory: string;
  successUrl: string;
  failUrl: string;
  cancelUrl: string;
}

export interface SslcommerzSessionResult {
  status: 'SUCCESS' | 'FAILED';
  gatewayPageUrl?: string;
  sessionKey?: string;
  failedReason?: string;
  raw?: Record<string, unknown>;
}

export interface SslcommerzValidation {
  status: 'VALID' | 'FAILED' | 'CANCELLED' | 'UNATTEMPTED';
  tranId?: string;
  bankTranId?: string;
  amount?: string;
  currencyType?: string;
  valueAmount?: string;
  tranDate?: string;
  raw: Record<string, unknown>;
}

export interface SslcommerzRefundResult {
  status: 'SUCCESS' | 'FAILED';
  refundRef?: string;
  raw: Record<string, unknown>;
}

@Injectable()
export class SslcommerzClient {
  private readonly logger = new Logger('SslcommerzClient');
  private readonly baseUrl = process.env.SSLCOMMERZ_BASE_URL
    || (process.env.SSLCOMMERZ_SANDBOX === 'true' ? SANDBOX : LIVE);
  private readonly storeId = process.env.SSLCOMMERZ_STORE_ID || '';
  private readonly storePasswd = process.env.SSLCOMMERZ_STORE_PASSWORD || '';

  /** poisha (int) → BDT string with 2 decimals. The ONLY conversion point in the app. */
  static poishaToBdt(poisha: number | string): string {
    const n = typeof poisha === 'string' ? Number(poisha) : poisha;
    return (n / 100).toFixed(2);
  }

  /** BDT string → poisha integer. Round-trips with poishaToBdt. */
  static bdtToPoisha(bdt: string | number): number {
    return Math.round(Number(bdt) * 100);
  }

  async sessionStart(input: SslcommerzSessionInput): Promise<SslcommerzSessionResult> {
    const body = new URLSearchParams({
      store_id: this.storeId,
      store_passwd: this.storePasswd,
      total_amount: input.amountBdt,
      currency: 'BDT',
      tran_id: input.tranId,
      success_url: input.successUrl,
      fail_url: input.failUrl,
      cancel_url: input.cancelUrl,
      cus_name: input.cusName,
      cus_email: input.cusEmail,
      cus_add1: input.cusAddress,
      cus_city: 'Dhaka',
      cus_country: 'Bangladesh',
      cus_phone: input.cusPhone,
      shipping_method: 'NO',
      product_name: input.productName,
      product_category: input.productCategory,
      product_profile: 'non-physical-goods',
    });
    const res = await fetch(this.baseUrl + '/gwprocess/v4/api.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
    const json = (await res.json()) as Record<string, any>;
    if (!res.ok || json.status !== 'SUCCESS' || !json.GatewayPageURL) {
      this.logger.warn('sessionStart failed: ' + JSON.stringify(json));
      return { status: 'FAILED', failedReason: json.failedreason || json.status || 'gateway_error', raw: json };
    }
    return { status: 'SUCCESS', gatewayPageUrl: json.GatewayPageURL, sessionKey: json.SessionKey, raw: json } as any;
  }

  async validate(valId: string): Promise<SslcommerzValidation> {
    const url = new URL(this.baseUrl + '/validator/api/validationserverAPI.php');
    url.searchParams.set('val_id', valId);
    url.searchParams.set('store_id', this.storeId);
    url.searchParams.set('store_passwd', this.storePasswd);
    url.searchParams.set('format', 'json');
    const res = await fetch(url.toString());
    const json = (await res.json()) as Record<string, any>;
    return {
      status: json.status,
      tranId: json.tran_id,
      bankTranId: json.bank_tran_id,
      amount: json.amount,
      currencyType: json.currency_type,
      valueAmount: json.value_amount,
      tranDate: json.tran_date,
      raw: json,
    };
  }

  async refund(input: {
    bankTranId: string;
    valId: string;
    refundAmountBdt: string;
    remarks: string;
  }): Promise<SslcommerzRefundResult> {
    const body = new URLSearchParams({
      v: 'v4',
      format: 'json',
      store_id: this.storeId,
      store_passwd: this.storePasswd,
      refund_amount: input.refundAmountBdt,
      refund_remarks: input.remarks,
      bank_tran_id: input.bankTranId,
      sid: input.valId,
      val_id: input.valId,
    });
    const res = await fetch(this.baseUrl + '/postrefund/api/postrefund.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
    const json = (await res.json()) as Record<string, any>;
    const ok = json.status === 'SUCCESS';
    if (!ok) this.logger.warn('refund failed: ' + JSON.stringify(json));
    return { status: ok ? 'SUCCESS' : 'FAILED', refundRef: json.refund_ref_id, raw: json };
  }
}
