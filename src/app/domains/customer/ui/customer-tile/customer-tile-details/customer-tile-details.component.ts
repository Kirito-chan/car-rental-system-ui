import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomerRentalInfo } from '../../../data/models/customer-rental-info.model';
import { Customer } from '../../../data/models/customer.model';

@Component({
  selector: 'app-customer-tile-details',
  imports: [],
  templateUrl: './customer-tile-details.component.html',
  styleUrl: './customer-tile-details.component.scss',
})
export class CustomerTileDetailsComponent {
  @Input() customer: CustomerRentalInfo;
  @Output() customerDelete = new EventEmitter<number>();
  @Output() customerEdit = new EventEmitter<Customer>();
}
