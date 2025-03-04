import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { PageRequestParams } from 'src/app/domains/shared/models/page-request-params.model';
import { CustomerRentalInfo } from '../../data/models/customer-rental-info.model';
import { Customer } from '../../data/models/customer.model';
import { CustomerService } from '../../data/services/customer.service';
import { CustomerCreateDialogComponent } from '../../ui/customer-create-dialog/customer-create-dialog.component';
import { CustomerTileComponent } from '../../ui/customer-tile/customer-tile.component';

@Component({
  selector: 'app-manage-customers',
  imports: [InfiniteScrollDirective, CustomerTileComponent, MatButtonModule],
  templateUrl: './manage-customers.component.html',
  styleUrl: './manage-customers.component.scss',
})
export class ManageCustomersComponent {
  customers: CustomerRentalInfo[] = [];
  currentPage = 1;
  itemsPerPage = 10;

  private readonly customerService = inject(CustomerService);
  private readonly dialog = inject(MatDialog);

  constructor() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService
      .getCustomers(this.buildCustomerRequestParams())
      .subscribe((response: CustomerRentalInfo[]) => (this.customers = response));
  }

  createCustomer() {
    const dialogRef = this.dialog.open(CustomerCreateDialogComponent, {
      minWidth: '400px',
    });

    dialogRef.afterClosed().subscribe((customer: Customer) => {
      if (customer !== undefined) {
        this.customerService.createCustomer(customer).subscribe({
          next: (createdCustomer) => {
            this.customers = [
              {
                id: createdCustomer.id,
                name: createdCustomer.name,
                email: createdCustomer.email,
                rentedCars: [],
              },
              ...this.customers,
            ];
          },
        });
      }
    });
  }

  editCustomer(customer: Customer) {
    this.customerService.editCustomer(customer).subscribe((customer) => this.updateAllCustomerAttributes(customer));
  }

  deleteCustomer(customerId: number) {
    this.customerService.deleteCustomer(customerId).subscribe({
      next: () => {
        this.customers = this.customers.filter((customer) => customer.id !== customerId);
      },
    });
  }

  onScroll = () => {
    this.currentPage++;
    this.appendData();
  };

  appendData = () => {
    this.customerService
      .getCustomers(this.buildCustomerRequestParams())
      .subscribe((response: CustomerRentalInfo[]) => (this.customers = [...this.customers, ...response]));
  };

  private updateAllCustomerAttributes(updatedCustomer: Customer) {
    this.customers = this.customers.map((customer) => {
      if (customer.id === updatedCustomer.id) {
        return { ...updatedCustomer, rentedCars: customer.rentedCars };
      }
      return customer;
    });
  }

  private buildCustomerRequestParams(): PageRequestParams {
    return {
      pageNumber: this.currentPage,
      pageSize: this.itemsPerPage,
    };
  }
}
