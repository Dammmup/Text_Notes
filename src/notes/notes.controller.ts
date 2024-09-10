// src/notes/note.controller.ts
import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from '../dto/create-note.dto';

@Controller('api/notes')
export class NoteController {
  constructor(private readonly noteService: NotesService) {}

  @Get()
  async findAll() {
    return this.noteService.findAll();
  }

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.noteService.delete(id);
  }
}
