import { Controller, HttpStatus, Post } from '@nestjs/common';
import { responseHandler } from '../common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async create() {
    const queuedNotification =
      await this.notificationService.enqueueNotification({
        notifyAt: new Date(Date.now() + 60 * 1000),
        targetDetails: {
          name: 'John Doe',
          message: 'This is a test notification',
          email: 'john.doe@example.com',
        },
      });

    return responseHandler(
      HttpStatus.CREATED,
      'Notification queued successfully',
      queuedNotification,
    );
  }
}
