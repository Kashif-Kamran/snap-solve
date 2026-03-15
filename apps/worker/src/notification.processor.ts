import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { NOTIFICATIONS_QUEUE } from '@app/shared';
import { Job } from 'bullmq';

@Injectable()
@Processor(NOTIFICATIONS_QUEUE)
export class NotificationProcessor extends WorkerHost {
  async process(job: Job): Promise<void> {
    console.log(
      `Sending Notification ${String(job.id)} with data localTime 
    ${new Date().toLocaleTimeString()}
    `,
      job.data,
    );
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(`Notification Sent ${String(job.id)} successfully`);
  }
}
