// Web-push adapter — VAPID (RFC 8292), per PRD C9.
//
// PRD C9 removed Firebase, so the scaffolded FCM/firebase-admin client was
// deleted. The design calls for VAPID web push; the implementation is
// DEFERRED (see DEFERRED_web_push.md in status/). Until it lands, this client
// is a best-effort no-op that preserves the dispatcher's contract:
//   - a push failure (or an absent VAPID key set) must NEVER fail the
//     triggering transaction — the in-app notification is the source of truth.
// send() therefore always resolves and only logs why it did nothing.
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class WebPushClient {
  private readonly logger = new Logger(WebPushClient.name);
  private warned = false;

  /** Always resolves. No-op until VAPID keys + push_subscriptions ship. */
  async send(_subscription: unknown, _title: string, _body: string, _data?: Record<string, string>): Promise<boolean> {
    if (!this.warned) {
      this.warned = true;
      this.logger.log('web push deferred (VAPID not implemented) — in-app notification is authoritative');
    }
    return false;
  }
}
