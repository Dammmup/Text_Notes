// src/notes/note.interface.ts
import { Document } from 'mongoose';

export interface Note extends Document {
  readonly title: string;
  readonly content: string;
  readonly userId: string; // Используйте userId вместо user
}
