import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_MODULES } from 'src/app/domains/shared/shared.const';
import { Car } from '../../data/models/car.model';

export interface CarFormGroup {
  id: FormControl<number>;
  make: FormControl<string>;
  model: FormControl<string>;
  totalSeats: FormControl<number>;
  automaticTransmission: FormControl<boolean>;
  totalKilometersDriven: FormControl<number>;
}

@Component({
  selector: 'app-car-edit-dialog',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, ...MAT_DIALOG_MODULES],
  templateUrl: './car-edit-dialog.component.html',
  styleUrl: './car-edit-dialog.component.scss',
})
export class CarEditDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<CarEditDialogComponent>);
  dialogData: Car = inject(MAT_DIALOG_DATA);
  formBuilder = inject(FormBuilder);

  editCarForm: FormGroup<CarFormGroup>;

  ngOnInit(): void {
    this.editCarForm = this.formBuilder.group({
      id: [this.dialogData.id],
      make: [this.dialogData.make],
      model: [this.dialogData.model],
      totalSeats: [this.dialogData.totalSeats],
      automaticTransmission: [this.dialogData.automaticTransmission],
      totalKilometersDriven: [this.dialogData.totalKilometersDriven],
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
