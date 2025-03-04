import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTileDetailsComponent } from './customer-tile-details.component';

describe('CustomerTileDetailsComponent', () => {
  let component: CustomerTileDetailsComponent;
  let fixture: ComponentFixture<CustomerTileDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerTileDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerTileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
