import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_MODULES } from '../shared.const';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [...MAT_DIALOG_MODULES],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
})
export class ConfirmationDialogComponent {
  readonly dialog = inject(MatDialog);
  dialogText: string = inject(MAT_DIALOG_DATA);

  readonly dialogRef = inject(MatDialogRef<ConfirmationDialogComponent>);
}
