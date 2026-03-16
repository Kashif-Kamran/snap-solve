import { Test, TestingModule } from '@nestjs/testing';
import { ProblemController } from './problem.controller';
import { ProblemService } from './problem.service';
import { describe, beforeEach, it, expect, jest } from '@jest/globals';
import { ProblemStatus } from '@app/shared';

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
            createProblem: jest.fn(),
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

  it('should create a problem and return a standard response', async () => {
    problemService.createProblem.mockResolvedValue({
      id: '1',
      language: 'typescript',
      code: 'console.log(1);',
      status: ProblemStatus.PENDING,
      runningLogs: null,
      createdAt: new Date('2026-01-01T00:00:00.000Z'),
      updatedAt: new Date('2026-01-01T00:00:00.000Z'),
    });

    await expect(
      controller.create({ language: 'typescript', code: 'console.log(1);' }),
    ).resolves.toEqual({
      statusCode: 201,
      message: 'Problem created successfully',
      data: {
        id: '1',
        language: 'typescript',
        code: 'console.log(1);',
        status: ProblemStatus.PENDING,
        runningLogs: null,
        createdAt: new Date('2026-01-01T00:00:00.000Z'),
        updatedAt: new Date('2026-01-01T00:00:00.000Z'),
      },
    });
  });
});
