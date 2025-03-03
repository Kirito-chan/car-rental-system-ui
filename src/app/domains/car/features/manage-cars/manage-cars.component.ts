import { Component, inject } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { Car } from '../../data/models/car.model';
import { CarsListRequestParams } from '../../data/models/cars-list-request-dto.model';
import { CarService } from '../../data/services/car.service';
import { CarTileComponent } from '../../ui/car-tile/car-tile.component';

@Component({
  selector: 'app-manage-cars',
  imports: [InfiniteScrollDirective, CarTileComponent],
  templateUrl: './manage-cars.component.html',
  styleUrl: './manage-cars.component.scss',
})
export class ManageCarsComponent {
  cars: Car[] = [];
  currentPage = 1;
  itemsPerPage = 10;

  private readonly carService = inject(CarService);

  constructor() {
    this.loadCars();
  }

  loadCars() {
    this.carService.getCars(this.buildCarRequestParams()).subscribe((response: Car[]) => (this.cars = response));
  }

  editCar(car: Car) {
    console.log(`Editing car: ${car.make} ${car.model}`);
  }

  deleteCar(carId: number) {
    this.carService.deleteCar(carId).subscribe();
    this.cars = this.cars.filter((car) => car.id !== carId);
  }

  onScroll = () => {
    this.currentPage++;
    this.appendData();
  };

  appendData = () => {
    this.carService
      .getCars(this.buildCarRequestParams())
      .subscribe((response: Car[]) => (this.cars = [...this.cars, ...response]));
  };

  private buildCarRequestParams(): CarsListRequestParams {
    return {
      pageNumber: this.currentPage,
      pageSize: this.itemsPerPage,
    };
  }
}
