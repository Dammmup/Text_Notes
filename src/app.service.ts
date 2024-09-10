import { Injectable, Logger } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor() {
    this.checkConnection();
  }

  private async checkConnection() {
    try {
      // Выполнить команду ping, чтобы проверить подключение
      await mongoose.connection.db.command({ ping: 1 });
      this.logger.log('MongoDB connection is healthy');
    } catch (error) {
      this.logger.error('Error checking MongoDB connection', error);
    }
  }
}
