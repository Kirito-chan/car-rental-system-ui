import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_MODULES } from 'src/app/domains/shared/shared.const';

@Component({
  selector: 'app-stop-rental-dialog',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, ...MAT_DIALOG_MODULES],
  templateUrl: './stop-rental-dialog.component.html',
  styleUrl: './stop-rental-dialog.component.scss',
})
export class StopRentalDialogComponent {
  readonly dialogRef = inject(MatDialogRef<StopRentalDialogComponent>);

  kilometersDrivenControl = new FormControl<number>(0);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
