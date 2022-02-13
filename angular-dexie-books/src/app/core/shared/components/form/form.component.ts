import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formConfig } from './form.config';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Input() option!: 'authors' | 'books';
  @Input() authors!: any;
  @Input() authorToUpdate: any;
  @Output() onSubmit = new EventEmitter<any>();
  public form!: FormGroup;
  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({ ...formConfig[this.option] });
  }

  public action() {
    this.onSubmit.emit(this.form.value);
    this.form.reset();
  }
}
