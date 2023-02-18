import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  template: `
    <nav class="toolbar">
      <ul nz-menu nzMode="vertical">
        <li
          nz-menu-item
          nz-tooltip="Wrok"
          i18n-nz-tooltip
          nzTooltipPlacement="right"
          nzMatchRouter
          [routerLink]="['/', 'admin', 'work']"
        >
          <span nz-icon nzType="desktop"></span>
        </li>
        <li
          nz-menu-item
          nz-tooltip="Space"
          i18n-nz-tooltip
          nzTooltipPlacement="right"
          nzMatchRouter
          [routerLink]="['/', 'admin', 'space']"
        >
          <span nz-icon nzType="environment"></span>
        </li>
        <li
          nz-menu-item
          nz-tooltip="Orgs"
          i18n-nz-tooltip
          nzTooltipPlacement="right"
          nzMatchRouter
          [routerLink]="['/', 'admin', 'orgs']"
        >
          <span nz-icon nzType="apartment"></span>
        </li>
        <li
          nz-menu-item
          nz-tooltip="Monitor"
          i18n-nz-tooltip
          nzTooltipPlacement="right"
          nzMatchRouter
          [routerLink]="['/', 'admin', 'monitor']"
        >
          <span nz-icon nzType="line-chart"></span>
        </li>
        <li
          nz-menu-item
          nz-tooltip="Settings"
          i18n-nz-tooltip
          nzTooltipPlacement="right"
          nzMatchRouter
          [routerLink]="['/', 'admin', 'settings']"
        >
          <span nz-icon nzType="setting"></span>
        </li>
      </ul>
    </nav>

    <router-outlet></router-outlet>
  `
})
export class AdminComponent {}
