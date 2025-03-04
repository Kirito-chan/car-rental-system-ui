import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map, startWith } from 'rxjs';
import { Customer } from 'src/app/domains/customer/data/models/customer.model';
import { CustomerService } from 'src/app/domains/customer/data/services/customer.service';
import { MAT_DIALOG_MODULES } from 'src/app/domains/shared/shared.const';

@Component({
  selector: 'app-start-rental-dialog',
  imports: [MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, ...MAT_DIALOG_MODULES],
  templateUrl: './start-rental-dialog.component.html',
  styleUrl: './start-rental-dialog.component.scss',
})
export class StartRentalDialogComponent {
  readonly dialogRef = inject(MatDialogRef<StartRentalDialogComponent>);
  readonly customerService = inject(CustomerService);
  readonly destroyRef = inject(DestroyRef);

  customerControl = new FormControl<string | Customer>('');
  customerOptions: Customer[];
  filteredOptions: Customer[];

  ngOnInit() {
    this.customerService.getCustomers().subscribe((customers) => {
      this.customerOptions = customers;
      this.filteredOptions = customers;
    });

    this.customerControl.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        startWith(''),
        map((value) => {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._filter(name as string) : [];
        })
      )
      .subscribe((value) => (this.filteredOptions = value));
  }

  displayFn(customer: Customer): string {
    return customer && customer.name ? customer.name : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private _filter(searchValue: string): Customer[] {
    const filterValue = searchValue.toLowerCase();

    return this.customerOptions.filter((customer) => customer.name.toLowerCase().includes(filterValue));
  }
}
