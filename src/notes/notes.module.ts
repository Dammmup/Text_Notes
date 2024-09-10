import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesService } from './notes.service';
import { NoteController } from './notes.controller';
import { NoteSchema } from './note.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Note', schema: NoteSchema }])],
  providers: [NotesService],
  controllers: [NoteController],
})
export class NotesModule {}
