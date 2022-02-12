import { Validators } from '@angular/forms';

export const formConfig = {
  authors: {
    name: ['', [Validators.required]],
  },
  books: {
    name: ['', [Validators.required]],
    date: ['', [Validators.required]],
    authors: ['', [Validators.required]],
  },
};
