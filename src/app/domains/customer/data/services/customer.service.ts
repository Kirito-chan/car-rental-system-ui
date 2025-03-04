import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseRequestService, HttpParamsObject } from 'src/app/core/services/base-request.service';
import { PageRequestParams } from 'src/app/domains/shared/models/page-request-params.model';
import { CUSTOMERS_PATH } from '../constants/customer.const';
import { CustomerRentalInfoResponse } from '../models/customer-rentail-info-response.model';
import { CustomerRentalInfo } from '../models/customer-rental-info.model';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends BaseRequestService {
  getCustomers(params?: PageRequestParams): Observable<CustomerRentalInfo[]> {
    const httpParams = new HttpParams();
    const pagedParams = params ? this.addParamsToHttp(httpParams, params as HttpParamsObject) : undefined;
    return this.get<CustomerRentalInfoResponse[]>(CUSTOMERS_PATH, pagedParams).pipe(
      map((response) =>
        response.map((customerRental) => ({ ...customerRental.customer, rentedCars: customerRental.rentedCars }))
      )
    );
  }

  createCustomer(customer: Customer) {
    return this.post<Customer, Customer>(CUSTOMERS_PATH, customer);
  }

  editCustomer(customer: Customer) {
    return this.put<Customer, Customer>(CUSTOMERS_PATH, customer);
  }

  deleteCustomer(customerId: number) {
    return this.delete(`${CUSTOMERS_PATH}/${customerId}`);
  }
}
