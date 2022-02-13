import { Component, OnInit } from '@angular/core';
import { IdbService } from '../../../shared/services/idb.service';
import { Author } from '../../../shared/interfaces/author.interface';
import { finderConfig } from './finder.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  availableAuthors: any;
  authors!: any;
  books!: any;
  authorToUpdate: any;
  finderConfig = finderConfig;

  findActions = {
    authors: {
      all: this.idb.findAuthors,
      name: this.idb.findAuthorsByName,
    },
    books: {
      all: this.idb.findBooks,
      name: this.idb.findBooksByName,
      authorName: this.idb.findBooksByAuthor,
      date: this.idb.findBooksByDate,
    },
  };

  constructor(private readonly idb: IdbService) {}

  ngOnInit(): void {
    this.availableAuthors = this.idb.findAuthors();
  }

  addBookHandler(formValue: any) {
    this.idb.addBook({
      name: formValue.bookName,
      authors: [...formValue.authors],
      date: formValue.date,
    });
  }

  addAuthorHandler(formValue: any) {
    this.idb.addAuthor({
      name: formValue.authorName,
    });
  }

  formHandler(formValue: any) {
    console.log(formValue);
  }

  // findAuthors() {
  //   return this.idb.findAuthors();
  // }
  //
  // findBooks() {
  //   return this.idb.findBooks();
  // }
  deleteHandler(toDelete: { type: string; id: string }) {
    toDelete.type === 'authors'
      ? this.idb.removeAuthor(toDelete.id)
      : undefined;
  }

  setAuthorToUpdate(author: Author) {
    this.authorToUpdate = { ...author };
  }

  updateAuthorHandler(formValue: any) {
    this.idb.updateAuthor({
      name: formValue.authorName,
      id: this.authorToUpdate.id,
    });
    this.authorToUpdate = null;
  }

  // findAllAuthorsHandler() {
  //   this.authors = this.idb.findAuthors();
  // }
  //
  // findAllBooksHandler() {
  //   this.books = this.idb.findBooks();
  // }

  find(formValue: any) {
    // console.log(formValue);
    // // @ts-ignore
    //
    // console.log(this.findActions[formValue.type][formValue.findBy]);
    // const result =
    //   // @ts-ignore
    //   this.findActions[formValue.type][formValue.findBy](formValue);
    // formValue.type === 'books'
    //   ? (this.books = result)
    //   : (this.authors = result);
    //TODO: Fix ugly switch
    switch (formValue.type) {
      case 'authors':
        switch (formValue.findBy) {
          case 'all':
            this.authors = this.idb.findAuthors();
            break;
          case 'name':
            this.authors = this.idb.findAuthorsByName(formValue);
            break;
        }
        break;
      case 'books':
        switch (formValue.findBy) {
          case 'all':
            this.books = this.idb.findBooks();
            break;
          case 'name':
            this.books = this.idb.findBooksByName(formValue);
            break;
          case 'authorName':
            this.books = this.idb.findBooksByAuthor(formValue);
            break;
          case 'date':
            this.books = this.idb.findBooksByDate(formValue);
            break;
        }
    }
  }
}
