import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartsRatingsComponent } from './starts-ratings.component';

describe('StartsRatingsComponent', () => {
  let component: StartsRatingsComponent;
  let fixture: ComponentFixture<StartsRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartsRatingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartsRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
