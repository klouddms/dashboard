import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SportsAll } from './sports_all.component';
import { Widget } from '../layout/widget/widget.directive';
//
// import '../../../node_modules/nvd3/build/nv.d3.min';
// import {nvD3} from 'ng2-nvd3';

export const routes = [
  { path: '', component: SportsAll, pathMatch: 'full' }
];

@NgModule({
  imports: [ CommonModule, RouterModule.forChild(routes) ],
  declarations: [ SportsAll ]
})
export default class SportsAllModule {
  static routes = routes;
}
