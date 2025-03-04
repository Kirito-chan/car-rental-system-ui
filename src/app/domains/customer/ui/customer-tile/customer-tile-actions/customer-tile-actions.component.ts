import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationDialogComponent } from 'src/app/domains/shared/confirmation-dialog/confirmation-dialog.component';
import { CustomerRentalInfo } from '../../../data/models/customer-rental-info.model';
import { Customer } from '../../../data/models/customer.model';
import { CustomerEditDialogComponent } from '../../customer-edit-dialog/customer-edit-dialog.component';

@Component({
  selector: 'app-customer-tile-actions',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './customer-tile-actions.component.html',
  styleUrl: './customer-tile-actions.component.scss',
})
export class CustomerTileActionsComponent {
  @Input() customer: CustomerRentalInfo;
  @Output() customerDelete = new EventEmitter<number>();
  @Output() customerEdit = new EventEmitter<Customer>();

  private readonly dialog = inject(MatDialog);

  onEditCustomer(customerRentalInfo: CustomerRentalInfo) {
    this.openEditCustomerDialog(customerRentalInfo);
  }

  onCustomerDelete(customer: CustomerRentalInfo) {
    const dialogRef = this.openConfirmationDialog(customer);
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.customerDelete.emit(customer.id);
      }
    });
  }

  private openEditCustomerDialog(customer: CustomerRentalInfo) {
    const dialogRef = this.dialog.open(CustomerEditDialogComponent, {
      minWidth: '400px',
      data: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
      },
    });

    dialogRef.afterClosed().subscribe((customer: Customer) => {
      if (customer !== undefined) {
        this.customerEdit.emit(customer);
      }
    });
  }

  private openConfirmationDialog(customer: CustomerRentalInfo) {
    return this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: `Are you sure you want to delete customer ${customer.name} ?`,
    });
  }
}
