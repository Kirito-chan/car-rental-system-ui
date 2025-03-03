import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarTileDetailsComponent } from './car-tile-details.component';

describe('CarTileDetailsComponent', () => {
  let component: CarTileDetailsComponent;
  let fixture: ComponentFixture<CarTileDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarTileDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarTileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
