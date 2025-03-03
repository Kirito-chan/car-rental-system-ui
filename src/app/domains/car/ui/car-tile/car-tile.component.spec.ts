import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarTileComponent } from './car-tile.component';

describe('CarTileComponent', () => {
  let component: CarTileComponent;
  let fixture: ComponentFixture<CarTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarTileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
