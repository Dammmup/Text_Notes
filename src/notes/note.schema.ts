// src/notes/note.schema.ts
import { Schema } from 'mongoose';

export const NoteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: String, required: true },
});

export interface Note extends Document {
  title: string;
  content: string;
  userId: string;
}
