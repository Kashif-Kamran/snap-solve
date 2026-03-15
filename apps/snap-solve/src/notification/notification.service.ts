import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { NOTIFICATIONS_QUEUE } from '@app/shared';
import { Queue } from 'bullmq';

const NOTIFICATION_JOB_NAME = 'send-notification';

@Injectable()
export class NotificationService {
  constructor(
    @InjectQueue(NOTIFICATIONS_QUEUE)
    private readonly notificationsQueue: Queue,
  ) {}

  async enqueueNotification({
    notifyAt,
    targetDetails: { name, message, email },
  }: {
    notifyAt: Date;
    targetDetails: {
      name: string;
      message: string;
      email: string;
    };
  }) {
    if (notifyAt.getTime() <= Date.now()) {
      throw new Error('Notification time must be in the future');
    }

    console.log(
      'Notification createdAt: ',
      new Date().toLocaleTimeString(),
      'Notification will be sent at: ',
      notifyAt.toLocaleTimeString(),
    );

    const delay = notifyAt.getTime() - Date.now();

    const payload = {
      name,
      message,
      email,
    };

    const job = await this.notificationsQueue.add(
      NOTIFICATION_JOB_NAME,
      payload,
      {
        delay,
      },
    );

    return {
      id: job.id,
      name: job.name,
      queue: NOTIFICATIONS_QUEUE,
      payload,
      delay,
    };
  }
}
