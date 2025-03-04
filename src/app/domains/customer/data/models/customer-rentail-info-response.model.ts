import { Car } from 'src/app/domains/car/data/models/car.model';
import { Customer } from './customer.model';

export interface CustomerRentalInfoResponse {
  customer: Customer;
  rentedCars: Car[];
}
