import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Any, R, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-settings-security-pwd-ttl',
  templateUrl: './pwd-ttl.component.html'
})
export class PwdTtlComponent implements OnInit {
  form!: FormGroup;
  tips = {
    pwd_ttl: {
      default: {
        required: `密码有效期不能为空`
      }
    }
  };
  formatterTimes = (value: number): string => `${value} 天`;

  constructor(
    @Inject(NZ_MODAL_DATA)
    public data: R,
    private wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      PwdTTL: [0, [Validators.required]]
    });
    const data = {
      PwdTTL: this.data['PwdTTL'] / 86400e9
    };
    this.form.patchValue(data);
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    data.PwdTTL = data.PwdTTL * 86400e9;
    this.wpx.setValues(data).subscribe(() => {
      this.message.success(`数据更新成功`);
      this.modalRef.triggerOk();
    });
  }
}
