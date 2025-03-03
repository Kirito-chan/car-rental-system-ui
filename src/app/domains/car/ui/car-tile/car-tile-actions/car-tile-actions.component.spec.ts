import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarTileActionsComponent } from './car-tile-actions.component';

describe('CarTileActionsComponent', () => {
  let component: CarTileActionsComponent;
  let fixture: ComponentFixture<CarTileActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarTileActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarTileActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
