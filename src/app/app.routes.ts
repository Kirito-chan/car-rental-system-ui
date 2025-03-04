import { Routes } from '@angular/router';
import { ManageCarsComponent } from './domains/car/features/manage-cars/manage-cars.component';
import { ManageCustomersComponent } from './domains/customer/features/manage-customers/manage-customers.component';

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
  {
    path: 'manage-customers',
    component: ManageCustomersComponent,
  },
];
