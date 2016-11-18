import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardC } from './dashboard.component';
import { Widget } from '../layout/widget/widget.directive';

export const routes = [
  { path: '', component: DashboardC, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    DashboardC,
    Widget
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export default class DashboardModule {
  static routes = routes;
}
