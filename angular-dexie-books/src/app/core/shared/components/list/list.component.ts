import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Author } from '../../interfaces/author.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @Input() option!: 'books' | 'authors';
  @Input() data!: any;
  @Output() action = new EventEmitter<{ type: string; id: string }>();
  @Output() onAuthor = new EventEmitter<Author>();
  constructor() {}

  ngOnInit(): void {}

  deleteAuthor(id: string) {
    this.action.emit({
      type: 'authors',
      id,
    });
  }

  deleteBook(id: string) {
    this.action.emit({
      type: 'books',
      id,
    });
  }

  updateAuthor(author: Author) {
    this.onAuthor.emit(author);
  }
}
