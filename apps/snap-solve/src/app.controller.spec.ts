import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { describe, beforeEach, it, expect } from '@jest/globals';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return a standardized api response', () => {
      expect(appController.getHello()).toEqual({
        statusCode: 200,
        message: 'Request successful',
        data: {
          greeting: 'Hello World!',
        },
      });
    });
  });
});
