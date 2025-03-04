import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { CarRentalInfo } from '../../data/models/car-rental-info.model';
import { Car } from '../../data/models/car.model';
import { StopRentalRequest } from '../../data/models/stop-rental-params.model';
import { CarTileActionsComponent } from './car-tile-actions/car-tile-actions.component';
import { CarTileDetailsComponent } from './car-tile-details/car-tile-details.component';

@Component({
  selector: 'app-car-tile',
  imports: [
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    CarTileDetailsComponent,
    CarTileActionsComponent,
  ],
  templateUrl: './car-tile.component.html',
  styleUrl: './car-tile.component.scss',
})
export class CarTileComponent {
  @Input() car: CarRentalInfo;
  @Output() carDelete = new EventEmitter<number>();
  @Output() carEdit = new EventEmitter<Car>();
  @Output() startRental = new EventEmitter<CarRentalInfo>();
  @Output() stopRental = new EventEmitter<StopRentalRequest>();
}
