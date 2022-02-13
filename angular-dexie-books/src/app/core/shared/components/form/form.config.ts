import { Validators } from '@angular/forms';

export const formConfig = {
  authors: {
    authorName: ['', [Validators.required]],
  },
  books: {
    bookName: ['', [Validators.required]],
    date: ['', [Validators.required]],
    authors: ['', [Validators.required]],
  },
};
