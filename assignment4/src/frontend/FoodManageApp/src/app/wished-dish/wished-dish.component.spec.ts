import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishedDishComponent } from './wished-dish.component';

describe('WishedDishComponent', () => {
  let component: WishedDishComponent;
  let fixture: ComponentFixture<WishedDishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishedDishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishedDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
