import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { PROBLEMS_QUEUE } from '@app/shared';
import { Queue } from 'bullmq';

const PROBLEM_JOB_NAME = 'create-problem';

const DEFAULT_PROBLEM_PAYLOAD = {
  title: 'Sample Problem',
  difficulty: 'easy',
  source: 'system',
};

@Injectable()
export class ProblemService {
  constructor(
    @InjectQueue(PROBLEMS_QUEUE)
    private readonly problemsQueue: Queue,
  ) {}

  async enqueueProblem() {
    const job = await this.problemsQueue.add(
      PROBLEM_JOB_NAME,
      DEFAULT_PROBLEM_PAYLOAD,
    );

    return {
      id: job.id,
      name: job.name,
      queue: PROBLEMS_QUEUE,
      payload: DEFAULT_PROBLEM_PAYLOAD,
    };
  }
}
