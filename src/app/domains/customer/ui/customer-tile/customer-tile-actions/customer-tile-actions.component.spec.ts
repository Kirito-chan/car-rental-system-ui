import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTileActionsComponent } from './customer-tile-actions.component';

describe('CustomerTileActionsComponent', () => {
  let component: CustomerTileActionsComponent;
  let fixture: ComponentFixture<CustomerTileActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerTileActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerTileActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
