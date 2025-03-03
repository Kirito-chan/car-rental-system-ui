import { NgClass } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationDialogComponent } from 'src/app/domains/shared/confirmation-dialog/confirmation-dialog.component';
import { Car } from '../../../data/models/car.model';

@Component({
  selector: 'app-car-tile-actions',
  imports: [NgClass, MatIconModule, MatButtonModule],
  templateUrl: './car-tile-actions.component.html',
  styleUrl: './car-tile-actions.component.scss',
})
export class CarTileActionsComponent {
  @Input() car: Car;
  @Output() carDelete = new EventEmitter<number>();
  @Output() carEdit = new EventEmitter<Car>();

  private readonly dialog = inject(MatDialog);

  onEditCar(car: Car) {
    this.carEdit.emit(car);
  }

  onCarDelete(car: Car) {
    const dialogRef = this.openConfirmationDialog(car);
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.carDelete.emit(car.id);
      }
    });
  }

  private openConfirmationDialog(car: Car) {
    return this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: `Are you sure you want to delete car ${car.make} ${car.model} ?`,
    });
  }
}
