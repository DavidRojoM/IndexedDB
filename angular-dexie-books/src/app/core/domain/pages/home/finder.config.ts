import { FinderOptions } from '../../../shared/interfaces/finder-options.interface';
import { Validators } from '@angular/forms';

export const finderConfig: { [key: string]: FinderOptions } = {
  findAllBooks: {
    findBy: 'all',
    type: 'books',
  },
  findBooksByName: {
    findBy: 'name',
    type: 'books',
  },
  findBooksByAuthor: {
    findBy: 'authorName',
    type: 'books',
  },
  findBooksByDate: {
    findBy: 'date',
    type: 'books',
  },
  findAllAuthors: {
    findBy: 'all',
    type: 'authors',
  },
  findAuthorsByName: {
    findBy: 'name',
    type: 'authors',
  },
};

export const finderFormConfig = {
  authors: {
    all: {},
    name: {
      name: ['', [Validators.required]],
    },
  },
  books: {
    all: {},
    name: {
      name: ['', [Validators.required]],
    },
    authorName: {
      name: ['', [Validators.required]],
    },
    date: {
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
    },
  },
};
