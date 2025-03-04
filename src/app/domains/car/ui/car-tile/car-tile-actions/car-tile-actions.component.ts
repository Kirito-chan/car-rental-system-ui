import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationDialogComponent } from 'src/app/domains/shared/confirmation-dialog/confirmation-dialog.component';
import { CarRentalInfo } from '../../../data/models/car-rental-info.model';
import { Car } from '../../../data/models/car.model';
import { CarEditDialogComponent } from '../../car-edit-dialog/car-edit-dialog.component';

@Component({
  selector: 'app-car-tile-actions',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './car-tile-actions.component.html',
  styleUrl: './car-tile-actions.component.scss',
})
export class CarTileActionsComponent {
  @Input() car: CarRentalInfo;
  @Output() carDelete = new EventEmitter<number>();
  @Output() carEdit = new EventEmitter<Car>();

  private readonly dialog = inject(MatDialog);

  onEditCar(carRentalInfo: CarRentalInfo) {
    this.openEditCarDialog(carRentalInfo);
  }

  onCarDelete(car: CarRentalInfo) {
    const dialogRef = this.openConfirmationDialog(car);
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.carDelete.emit(car.id);
      }
    });
  }

  private openEditCarDialog(car: CarRentalInfo) {
    const dialogRef = this.dialog.open(CarEditDialogComponent, {
      data: {
        id: car.id,
        make: car.make,
        model: car.model,
        totalSeats: car.totalSeats,
        automaticTransmission: car.automaticTransmission,
        totalKilometersDriven: car.totalKilometersDriven,
      },
    });

    dialogRef.afterClosed().subscribe((car: Car) => {
      if (car !== undefined) {
        this.carEdit.emit(car);
      }
    });
  }

  private openConfirmationDialog(car: CarRentalInfo) {
    return this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: `Are you sure you want to delete car ${car.make} ${car.model} ?`,
    });
  }
}
