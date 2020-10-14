import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningPage } from './cleaning.page';

describe('CleaningPage', () => {
  let component: CleaningPage;
  let fixture: ComponentFixture<CleaningPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleaningPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleaningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
