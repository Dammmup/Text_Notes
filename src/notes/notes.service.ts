/* eslint-disable @typescript-eslint/no-unused-vars */
// src/notes/notes.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from './note.interface';
import { CreateNoteDto } from 'src/dto/create-note.dto';

@Injectable()
export class NotesService {
  async delete(id: string): Promise<void> {
    this.logger.log(`Удаление заметки с ID: ${id}`);
    await this.noteModel.findByIdAndDelete(id).exec();
  }

  private readonly logger = new Logger(NotesService.name);

  constructor(@InjectModel('Note') private readonly noteModel: Model<Note>) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const newNote = new this.noteModel(createNoteDto);
    this.logger.log(`Создание заметки: ${JSON.stringify(createNoteDto)}`);
    return newNote.save();
  }

  async findAll(): Promise<Note[]> {
    this.logger.log('Получение всех заметок');
    return this.noteModel.find().exec();
  }
}
