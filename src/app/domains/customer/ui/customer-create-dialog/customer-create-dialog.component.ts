import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_MODULES } from 'src/app/domains/shared/shared.const';

export interface CustomerFormGroup {
  id: FormControl<number>;
  name: FormControl<string>;
  email: FormControl<string>;
}

@Component({
  selector: 'app-customer-create-dialog',
  imports: [...MAT_DIALOG_MODULES, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './customer-create-dialog.component.html',
  styleUrl: './customer-create-dialog.component.scss',
})
export class CustomerCreateDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CustomerCreateDialogComponent>);
  formBuilder = inject(FormBuilder);

  createCustomerForm: FormGroup<CustomerFormGroup>;

  ngOnInit(): void {
    this.createCustomerForm = this.formBuilder.group({
      id: [],
      name: [],
      email: [],
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
