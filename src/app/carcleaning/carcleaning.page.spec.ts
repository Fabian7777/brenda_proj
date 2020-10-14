import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarcleaningPage } from './carcleaning.page';

describe('CarcleaningPage', () => {
  let component: CarcleaningPage;
  let fixture: ComponentFixture<CarcleaningPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarcleaningPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarcleaningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
