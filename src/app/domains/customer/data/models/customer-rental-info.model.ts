import { Car } from 'src/app/domains/car/data/models/car.model';

export interface CustomerRentalInfo {
  id: number;
  name: string;
  email: string;
  rentedCars: Car[];
}
