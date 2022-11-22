import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { DevComponent } from './dev.component';

const routes: Routes = [
  {
    path: '',
    component: DevComponent,
    children: [
      {
        path: 'richtext',
        loadChildren: () => import('./richtext/richtext.module').then(m => m.RichtextModule)
      }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [DevComponent]
})
export class DevModule {}
