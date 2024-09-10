// src/users/user.service.ts
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    this.logger.log(`Создание пользователя: ${JSON.stringify(createUserDto)}`);
    return newUser.save();
  }

  async findOne(username: string): Promise<User | undefined> {
    return await this.userModel.findOne({ username }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findAll(): Promise<User[]> {
    this.logger.log('Получение всех данных пользователей');
    const users = await this.userModel.find().exec();

    if (users.length === 0) {
      this.logger.warn('Пользователи не найдены');
      throw new NotFoundException('Пользователи не найдены');
    }

    return users;
  }

  async findByUsername(username: string): Promise<User | null> {
    // Поиск пользователя по полю username в базе данных без использования `where`
    const user = await this.userModel.findOne({ username }).exec();
    return user || null;
  }
}
