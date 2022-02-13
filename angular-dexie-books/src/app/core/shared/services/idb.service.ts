import { Injectable } from '@angular/core';
import Dexie, { liveQuery, Table } from 'dexie';
import { Book } from '../interfaces/book.interface';
import { Author } from '../interfaces/author.interface';
import { v4 } from 'uuid';
@Injectable({
  providedIn: 'root',
})
export class IdbService extends Dexie {
  books!: Table<Book>;
  authors!: Table<Author>;

  constructor() {
    super('bookShop');
    this.version(1).stores({
      authors: 'id,name',
      books: 'id,name,date',
    });
  }

  public addAuthor(author: Author) {
    return this.authors.add({
      ...author,
      id: this.generateUUID(),
    });
  }

  public removeAuthor(id: string) {
    this.authors.delete(id).then(() => {
      this.books.toCollection().modify((book) => {
        book.authors = book.authors.filter((author) => author.id !== id);
      });
    });
  }

  public findAuthors() {
    return liveQuery(() => this.authors.toArray());
  }

  public findAuthorById(id: string) {
    return liveQuery(() =>
      this.authors.where('id').equalsIgnoreCase(id).first()
    );
  }

  public findAuthorsByName({ name }: any) {
    return liveQuery(() =>
      this.authors.where('name').equalsIgnoreCase(name).toArray()
    );
  }

  public updateAuthor(author: Author) {
    this.authors.put(author).then(() => {
      this.books.toCollection().modify((book) => {
        book.authors = book.authors.map((bookAuthor) => {
          return bookAuthor.id === author.id ? author : bookAuthor;
        });
      });
    });
  }

  public addBook(book: Book) {
    book.id = this.generateUUID();
    return this.books.add({
      ...book,
    });
  }

  public findBooks() {
    return liveQuery(() => this.books.toArray());
  }

  public findBooksByName({ name }: any) {
    return liveQuery(() =>
      this.books.where('name').equalsIgnoreCase(name).toArray()
    );
  }

  public findBooksByDate({ from, to }: any) {
    console.log(from, to);
    return liveQuery(() =>
      this.books.where('date').between(from, to).toArray()
    );
  }

  public findBooksByAuthor({ name }: any) {
    return liveQuery(() =>
      this.books
        .toCollection()
        .filter((book) => {
          return book.authors.some((author) => author.name === name);
        })
        .toArray()
    );
  }

  private generateUUID(): string {
    return v4();
  }
}
