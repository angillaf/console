import { Directive, OnDestroy, OnInit } from '@angular/core';
import { FormGroupName } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BitService } from 'ngx-bit';

@Directive({
  selector: '[formGroupName][bitI18nUpdate]'
})
export class BitI18nUpdateDirective implements OnInit, OnDestroy {
  private changes!: Subscription;

  constructor(private bit: BitService, private formGroupName: FormGroupName) {}

  ngOnInit(): void {
    this.changes = this.formGroupName.valueChanges!.subscribe(value => {
      const emptyI18n = [];
      for (const ID in value) {
        if (value.hasOwnProperty(ID)) {
          if (!value[ID]) {
            emptyI18n.push(ID);
          }
        }
      }
      this.bit.i18nTooltip[<string>this.formGroupName.name] = emptyI18n;
    });
  }

  ngOnDestroy(): void {
    this.changes.unsubscribe();
  }
}
