import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { PROBLEMS_QUEUE } from '@app/shared';
import { Job } from 'bullmq';

@Injectable()
@Processor(PROBLEMS_QUEUE)
export class ProblemProcessor extends WorkerHost {
  async process(job: Job): Promise<void> {
    console.log(`Processing job ${String(job.id)} with data:`, job.data);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(`Job ${String(job.id)} has been completed.`);
  }
}
