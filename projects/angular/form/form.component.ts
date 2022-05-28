import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Schema, SchemaField, SchemaRule, Value } from '@weplanx/ng';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';

import { ApiService } from './api.service';

@Component({
  selector: 'wpx-form',
  templateUrl: './form.component.html'
})
export class WpxFormComponent implements OnInit {
  @Input() wpxFields!: SchemaField[];
  @Input() wpxRules!: SchemaRule[];
  @Input() wpxSubmitHide = false;
  @Input() wpxSubmit = (value: any): void => {};
  @Output() readonly wpxInit: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  infinity = Infinity;
  form?: FormGroup;
  checkBoxOptions: Record<string, NzCheckBoxOptionInterface[]> = {};
  refs: Record<string, Value[]> = {};

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    const controlsConfig: Record<string, any[]> = {};
    for (const x of this.wpxFields) {
      const validator: any[] = [];
      if (x.required) {
        validator.push(Validators.required);
      }
      switch (x.type) {
        case 'checkbox':
          const options: NzCheckBoxOptionInterface[] =
            x.option?.values?.map<NzCheckBoxOptionInterface>(v => ({
              label: v.label,
              value: v.value
            })) ?? [];
          this.checkBoxOptions[x.key] = options;
          break;
        case 'select':
          if (x.option?.reference) {
            this.api.ref(x.option.reference, x.option?.target).subscribe(v => {
              this.refs[x.key] = v;
            });
          }
          break;
      }
      controlsConfig[x.key] = [x.default, validator];
    }
    this.form = this.fb.group(controlsConfig);
    this.wpxInit.emit(this.form);
  }
}
