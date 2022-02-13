import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FinderOptions } from '../../interfaces/finder-options.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finderFormConfig } from '../../../domain/pages/home/finder.config';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.css'],
})
export class FinderComponent implements OnInit {
  @Input() options!: FinderOptions;
  @Output() onFind = new EventEmitter<any>();
  form!: FormGroup;
  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      // @ts-ignore
      ...finderFormConfig[this.options.type][this.options.findBy],
    });
  }

  submit() {
    this.onFind.emit({
      ...this.options,
      ...this.form.value,
    });
  }
}
