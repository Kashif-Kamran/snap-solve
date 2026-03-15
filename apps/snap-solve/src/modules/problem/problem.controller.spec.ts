import { Test, TestingModule } from '@nestjs/testing';
import { ProblemController } from './problem.controller';
import { ProblemService } from './problem.service';
import { describe, beforeEach, it, expect, jest } from '@jest/globals';

describe('ProblemController', () => {
  let controller: ProblemController;
  let problemService: jest.Mocked<ProblemService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProblemController],
      providers: [
        {
          provide: ProblemService,
          useValue: {
            enqueueProblem: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProblemController>(ProblemController);
    problemService = module.get(ProblemService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should queue a problem and return a standard response', async () => {
    problemService.enqueueProblem.mockResolvedValue({
      id: '1',
      name: 'create-problem',
      queue: 'problems',
      payload: {
        title: 'Sample Problem',
        difficulty: 'easy',
        source: 'system',
      },
    });

    await expect(controller.create()).resolves.toEqual({
      statusCode: 201,
      message: 'Problem queued successfully',
      data: {
        id: '1',
        name: 'create-problem',
        queue: 'problems',
        payload: {
          title: 'Sample Problem',
          difficulty: 'easy',
          source: 'system',
        },
      },
    });
  });
});
