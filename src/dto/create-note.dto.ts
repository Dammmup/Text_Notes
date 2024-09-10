// src/notes/create-note.dto.ts
export class CreateNoteDto {
  readonly title: string;
  readonly content: string;
  readonly userId: string; // Используйте userId, а не user
}
