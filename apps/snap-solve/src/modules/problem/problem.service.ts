import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Problem } from '@app/database';
import { ProblemStatus } from '@app/shared';
import { Repository } from 'typeorm';
import { CreateProblemDto } from './dto/create-problem.dto';

@Injectable()
export class ProblemService {
  constructor(
    @InjectRepository(Problem)
    private readonly problemsRepository: Repository<Problem>,
  ) {}

  async createProblem(createProblemDto: CreateProblemDto): Promise<Problem> {
    const problem = this.problemsRepository.create({
      language: createProblemDto.language,
      code: createProblemDto.code,
      status: ProblemStatus.PENDING,
      runningLogs: null,
    });

    return this.problemsRepository.save(problem);
  }
}
