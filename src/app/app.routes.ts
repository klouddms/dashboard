import { Routes } from '@angular/router';
import { ErrorComponent } from './component/error/error.component';


export const ROUTES: Routes = [{
  path: '', redirectTo: 'app', pathMatch: 'full'
}, {
  path: 'app',   loadChildren: () => System.import('./component/layout/layout.module')
}, {
  path: 'login', loadChildren: () => System.import('./component/login/login.module')
}, {
  path: 'error', component: ErrorComponent
}, {
  path: '**',    component: ErrorComponent
}
];
