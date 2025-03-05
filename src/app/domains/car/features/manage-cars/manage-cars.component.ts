import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { PageRequestParams } from 'src/app/domains/shared/models/page-request-params.model';
import { CarRentalInfo } from '../../data/models/car-rental-info.model';
import { Car } from '../../data/models/car.model';
import { Rental } from '../../data/models/rental.model';
import { StopRentalRequest } from '../../data/models/stop-rental-params.model';
import { CarService } from '../../data/services/car.service';
import { CarTileComponent } from '../../ui/car-tile/car-tile.component';

@Component({
  selector: 'app-manage-cars',
  imports: [InfiniteScrollDirective, CarTileComponent, AsyncPipe],
  templateUrl: './manage-cars.component.html',
  styleUrl: './manage-cars.component.scss',
})
export class ManageCarsComponent {
  cars: CarRentalInfo[] = [];
  currentPage = 1;
  itemsPerPage = 10;

  private readonly carService = inject(CarService);

  currentlyRentedCars$ = this.carService.getTotalRentedCars();

  constructor() {
    this.loadCars();
  }

  loadCars() {
    this.carService
      .getCars(this.buildCarRequestParams())
      .subscribe((response: CarRentalInfo[]) => (this.cars = response));
  }

  editCar(car: Car) {
    this.carService.editCar(car).subscribe((car) => this.updateAllCarAttributes(car));
  }

  startRental(rental: CarRentalInfo) {
    const rentalRequest: Rental = {
      carId: rental.id,
      customerId: rental.customerId,
    };
    this.carService.startCarRental(rentalRequest).subscribe(() => {
      this.updateCarAttributes(rental.id, true, rental.customerName);
    });
  }

  stopRental(stopRentalRequest: StopRentalRequest) {
    this.carService.stopCarRental(stopRentalRequest).subscribe((kilometersDriven) => {
      this.updateCarAttributes(stopRentalRequest.carId, false, undefined, kilometersDriven);
    });
  }

  deleteCar(carId: number) {
    this.carService.deleteCar(carId).subscribe({
      next: () => {
        this.cars = this.cars.filter((car) => car.id !== carId);
      },
    });
  }

  onScroll = () => {
    this.currentPage++;
    this.appendData();
  };

  appendData = () => {
    this.carService
      .getCars(this.buildCarRequestParams())
      .subscribe((response: CarRentalInfo[]) => (this.cars = [...this.cars, ...response]));
  };

  private updateCarAttributes(
    carId: number,
    rented: boolean,
    customerName: string | undefined,
    kilometersDriven?: number
  ) {
    this.cars = this.cars.map((car) => {
      if (car.id === carId) {
        return { ...car, rented, customerName, totalKilometersDriven: kilometersDriven ?? car.totalKilometersDriven };
      }
      return car;
    });
  }

  private updateAllCarAttributes(updatedCar: Car) {
    this.cars = this.cars.map((car) => {
      if (car.id === updatedCar.id) {
        return { ...updatedCar, customerName: car.customerName };
      }
      return car;
    });
  }

  private buildCarRequestParams(): PageRequestParams {
    return {
      pageNumber: this.currentPage,
      pageSize: this.itemsPerPage,
    };
  }
}
