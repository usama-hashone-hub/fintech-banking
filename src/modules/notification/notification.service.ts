import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepo: Repository<Notification>,
  ) {}

  async getUnreadNotifications(userId: string) {
    return this.notificationRepo.find({
      where: { userId, status: 'UNREAD' },
      order: { createdAt: 'DESC' },
    });
  }

  async createNotification(userId: string, message: string, type: string) {
    const notification = this.notificationRepo.create({ userId, message, type });
    return this.notificationRepo.save(notification);
  }
}