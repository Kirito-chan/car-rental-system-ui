import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_MODULES } from 'src/app/domains/shared/shared.const';
import { Customer } from '../../data/models/customer.model';

export interface CustomerFormGroup {
  id: FormControl<number>;
  name: FormControl<string>;
  email: FormControl<string>;
}

@Component({
  selector: 'app-customer-edit-dialog',
  imports: [...MAT_DIALOG_MODULES, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './customer-edit-dialog.component.html',
  styleUrl: './customer-edit-dialog.component.scss',
})
export class CustomerEditDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CustomerEditDialogComponent>);
  dialogData: Customer = inject(MAT_DIALOG_DATA);
  formBuilder = inject(FormBuilder);

  editCustomerForm: FormGroup<CustomerFormGroup>;

  ngOnInit(): void {
    this.editCustomerForm = this.formBuilder.group({
      id: [this.dialogData.id],
      name: [this.dialogData.name],
      email: [this.dialogData.email],
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
