import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundryPage } from './laundry.page';

describe('LaundryPage', () => {
  let component: LaundryPage;
  let fixture: ComponentFixture<LaundryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaundryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaundryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
