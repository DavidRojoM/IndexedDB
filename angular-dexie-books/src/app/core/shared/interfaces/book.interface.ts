import { Author } from './author.interface';

export interface Book {
  id?: string;
  name: string;
  date: string;
  authors: Author[];
}
