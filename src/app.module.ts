import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/user.module';
import { NotesModule } from './notes/notes.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './logger.middleware';
import mongoose from 'mongoose';
mongoose.set('debug', true);

@Module({
  imports: [
    ConfigModule.forRoot(), // Для работы с .env файлом
    MongooseModule.forRoot(
      'mongodb+srv://Daamer:Lolziik2281337@cluster0.frupwqy.mongodb.net/test?retryWrites=true&w=majority',
    ),
    UserModule,
    NotesModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  private readonly logger = new Logger(AppModule.name);
  constructor() {
    mongoose.connection.on('connected', () => {
      this.logger.log('Successfully connected to MongoDB');
    });

    mongoose.connection.on('error', (error) => {
      this.logger.error('Error connecting to MongoDB', error);
    });
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Применяется ко всем маршрутам
  }
}
