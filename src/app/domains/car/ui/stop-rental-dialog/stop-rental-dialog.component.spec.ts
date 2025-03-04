import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopRentalDialogComponent } from './stop-rental-dialog.component';

describe('StopRentalDialogComponent', () => {
  let component: StopRentalDialogComponent;
  let fixture: ComponentFixture<StopRentalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StopRentalDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopRentalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
