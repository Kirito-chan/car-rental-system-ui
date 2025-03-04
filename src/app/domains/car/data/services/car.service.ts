import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseRequestService, HttpParamsObject } from 'src/app/core/services/base-request.service';
import { PageRequestParams } from 'src/app/domains/shared/models/page-request-params.model';
import { CARS_PATH, RENTAL_PATH, TOTAL_RENTED_CARS_PATH } from '../constants/car.const';
import { CarRentalInfoResponse } from '../models/car-rental-info-response.model';
import { CarRentalInfo } from '../models/car-rental-info.model';
import { Car } from '../models/car.model';
import { Rental } from '../models/rental.model';
import { StopRentalRequest } from '../models/stop-rental-params.model';

@Injectable({
  providedIn: 'root',
})
export class CarService extends BaseRequestService {
  getCars(params?: PageRequestParams): Observable<CarRentalInfo[]> {
    const httpParams = new HttpParams();
    const pagedParams = params ? this.addParamsToHttp(httpParams, params as HttpParamsObject) : undefined;
    return this.get<CarRentalInfoResponse[]>(CARS_PATH, pagedParams).pipe(
      map((response) => response.map((carRental) => ({ ...carRental.car, customerName: carRental.customerName })))
    );
  }

  getTotalRentedCars() {
    return this.get<number>(`${RENTAL_PATH}/${TOTAL_RENTED_CARS_PATH}`);
  }

  editCar(car: Car) {
    return this.put<Car, Car>(CARS_PATH, car);
  }

  deleteCar(carId: number) {
    return this.delete(`${CARS_PATH}/${carId}`);
  }

  startCarRental(rental: Rental): Observable<number> {
    return this.post(`${RENTAL_PATH}`, rental);
  }

  stopCarRental(stopRentalRequest: StopRentalRequest): Observable<number> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('kilometersDriven', stopRentalRequest.kilometersDriven);
    return this.delete<number>(`${RENTAL_PATH}/${stopRentalRequest.carId}`, httpParams);
  }
}
