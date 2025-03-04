import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { CustomerRentalInfo } from '../../data/models/customer-rental-info.model';
import { Customer } from '../../data/models/customer.model';
import { CustomerTileActionsComponent } from './customer-tile-actions/customer-tile-actions.component';
import { CustomerTileDetailsComponent } from './customer-tile-details/customer-tile-details.component';

@Component({
  selector: 'app-customer-tile',
  imports: [
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    CustomerTileDetailsComponent,
    CustomerTileActionsComponent,
  ],
  templateUrl: './customer-tile.component.html',
  styleUrl: './customer-tile.component.scss',
})
export class CustomerTileComponent {
  @Input() customer: CustomerRentalInfo;
  @Output() customerDelete = new EventEmitter<number>();
  @Output() customerEdit = new EventEmitter<Customer>();
}
