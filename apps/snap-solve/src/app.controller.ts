import { Controller, Get, HttpStatus } from '@nestjs/common';
import { responseHandler } from './common';
import type { ApiResponse } from './common';

@Controller()
export class AppController {
  @Get()
  getHello(): ApiResponse<{ greeting: string }> {
    return responseHandler(HttpStatus.OK, 'Request successful', {
      greeting: 'Hello World!',
    });
  }
}
