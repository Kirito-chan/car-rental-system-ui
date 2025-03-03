import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRequestService, HttpParamsObject } from 'src/app/core/services/base-request.service';
import { cars } from '../constants/car.const';
import { Car } from '../models/car.model';
import { CarsListRequestParams } from '../models/cars-list-request-dto.model';

@Injectable({
  providedIn: 'root',
})
export class CarService extends BaseRequestService {
  getCars(params?: CarsListRequestParams): Observable<Car[]> {
    const httpParams = new HttpParams();
    const pagedUserParams = this.addParamsToHttp(httpParams, params as HttpParamsObject);
    return this.get<Car[]>(cars, pagedUserParams);
  }

  deleteCar(carId: number) {
    return this.delete(`${cars}/${carId}`);
  }
}
