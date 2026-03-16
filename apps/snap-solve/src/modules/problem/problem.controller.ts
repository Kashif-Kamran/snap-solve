import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { responseHandler } from '../../common';
import { ProblemService } from './problem.service';
import { CreateProblemDto } from './dto/create-problem.dto';

@Controller('problems')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Post()
  async create(@Body() createProblemDto: CreateProblemDto) {
    const createdProblem =
      await this.problemService.createProblem(createProblemDto);
    return responseHandler(
      HttpStatus.CREATED,
      'Problem created successfully',
      createdProblem,
    );
  }
}
