import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';
import { Car } from '../../../data/models/car.model';

@Component({
  selector: 'app-car-tile-details',
  imports: [NgClass, MatIconModule, MatButtonModule],
  templateUrl: './car-tile-details.component.html',
  styleUrl: './car-tile-details.component.scss',
})
export class CarTileDetailsComponent {
  @Input() car: Car;
  @Output() carDelete = new EventEmitter<number>();
  @Output() carEdit = new EventEmitter<Car>();

  toggleRental(car: Car) {
    car.isRented = !car.isRented;
  }
}
