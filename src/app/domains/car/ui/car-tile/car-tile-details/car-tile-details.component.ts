import { NgClass } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from 'src/app/domains/customer/data/models/customer.model';
import { CarRentalInfo } from '../../../data/models/car-rental-info.model';
import { Car } from '../../../data/models/car.model';
import { StopRentalRequest } from '../../../data/models/stop-rental-params.model';
import { StartRentalDialogComponent } from '../../start-rental-dialog/start-rental-dialog.component';
import { StopRentalDialogComponent } from '../../stop-rental-dialog/stop-rental-dialog.component';

@Component({
  selector: 'app-car-tile-details',
  imports: [NgClass, MatIconModule, MatButtonModule],
  templateUrl: './car-tile-details.component.html',
  styleUrl: './car-tile-details.component.scss',
})
export class CarTileDetailsComponent {
  @Input() car: CarRentalInfo;
  @Output() carDelete = new EventEmitter<number>();
  @Output() carEdit = new EventEmitter<Car>();
  @Output() startRental = new EventEmitter<CarRentalInfo>();
  @Output() stopRental = new EventEmitter<StopRentalRequest>();

  readonly dialog = inject(MatDialog);

  onRentalButtonClick(car: CarRentalInfo) {
    if (car.rented) {
      this.openStopRentalDialog(car);
      return;
    }
    this.openStartRentalDialog(car);
  }

  private openStartRentalDialog(car: CarRentalInfo) {
    const dialogRef = this.dialog.open(StartRentalDialogComponent);

    dialogRef.afterClosed().subscribe((customer: Customer) => {
      if (customer !== undefined) {
        const rental: CarRentalInfo = {
          id: car.id,
          customerId: customer.id,
          customerName: customer.name,
        };
        this.startRental.emit(rental);
      }
    });
  }

  private openStopRentalDialog(car: CarRentalInfo) {
    const dialogRef = this.dialog.open(StopRentalDialogComponent);

    dialogRef.afterClosed().subscribe((kilometersDriven: number) => {
      if (kilometersDriven !== undefined) {
        const rental: StopRentalRequest = {
          carId: car.id,
          kilometersDriven,
        };
        this.stopRental.emit(rental);
      }
    });
  }
}
