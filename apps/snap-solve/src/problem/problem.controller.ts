import { Controller, HttpStatus, Post } from '@nestjs/common';
import { responseHandler } from '../common';
import { ProblemService } from './problem.service';

@Controller('problems')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Post()
  async create() {
    const queuedProblem = await this.problemService.enqueueProblem();

    return responseHandler(
      HttpStatus.CREATED,
      'Problem queued successfully',
      queuedProblem,
    );
  }
}
