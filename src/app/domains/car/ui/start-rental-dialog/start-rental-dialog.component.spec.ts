import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartRentalDialogComponent } from './start-rental-dialog.component';

describe('StartRentalCustomerDropdownDialogComponent', () => {
  let component: StartRentalDialogComponent;
  let fixture: ComponentFixture<StartRentalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartRentalDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StartRentalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
