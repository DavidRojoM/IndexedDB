import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { formConfig } from './form.config';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Input() option!: 'authors' | 'books';
  form = this.fb.group({ ...formConfig[this.option] });
  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {}
}
