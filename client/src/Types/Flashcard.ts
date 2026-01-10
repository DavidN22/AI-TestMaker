export interface Flashcard {
  term: string;
  definition: string;
  highlights?: string[];
}

export interface FlashcardSet {
  id: number;
  title: string;
  flashcards: {
    flashcards: Flashcard[];
  };
  created_at: string;
  source_type: 'ai' | 'test';
  source_id?: string;
  topic?: string;
  is_favorite: boolean;
}

export interface FlashcardHistory {
  recent: FlashcardSet[];
  favorites: FlashcardSet[];
}
