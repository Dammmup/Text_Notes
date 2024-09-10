import { Controller, Get, Logger } from '@nestjs/common';
import mongoose from 'mongoose';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  @Get('status')
  getStatus(): string {
    if (
      mongoose.connection.readyState === mongoose.ConnectionStates.connected
    ) {
      return 'MongoDB connection is healthy';
    } else {
      return 'MongoDB connection is not healthy';
    }
  }
}
