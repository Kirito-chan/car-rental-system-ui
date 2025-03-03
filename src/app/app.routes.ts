import { Routes } from '@angular/router';
import { ManageCarsComponent } from './domains/car/features/manage-cars/manage-cars.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'manage-cars',
    pathMatch: 'full',
  },
  {
    path: 'manage-cars',
    component: ManageCarsComponent,
  },
];
