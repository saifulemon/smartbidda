// One funnel for every trigger. Persists the in-app notification (source of truth)
// then best-effort web push (skipped when non-transactional + in quiet-hours).
//
// Push is VAPID web push per PRD C9 (Firebase was removed); the send path is
// currently a deferred no-op — see DEFERRED_web_push.md. The in-app row is
// written unconditionally, so alerting is fully functional without push.
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WebPushClient } from '../../infrastructure/push/web-push.client';
import { renderTemplate } from './notification-templates';
import { inQuietHours } from './quiet-hours';
import { Notifications } from './notifications.entity';

@Injectable()
export class NotificationDispatcher {
  private readonly logger = new Logger(NotificationDispatcher.constructor.name);
  constructor(
    private readonly webPush: WebPushClient,
    @InjectRepository(Notifications) private readonly notifications: Repository<Notifications>,
  ) {}

  async dispatch(triggerKey: string, recipient: { userId: string }, vars: Record<string, string | number> = {}): Promise<void> {
    const t = renderTemplate(triggerKey, vars);
    if (!t) { this.logger.warn('unknown trigger ' + triggerKey); return; }
    // persist in-app notification (always)
    const n = this.notifications.create({
      recipientUserId: recipient.userId,
      category: t.category,
      title: t.title,
      titleBn: t.titleBn,
      body: t.body,
      bodyBn: t.bodyBn,
      read: false,
    } as any);
    await this.notifications.save(n);
    // push: transactional always; non-transactional skipped during quiet-hours
    if (!t.transactional && inQuietHours(new Date())) return;
    await this.webPush.send(undefined, t.titleBn, t.bodyBn, t.deeplink ? { deeplink: t.deeplink } : undefined);
  }
}
