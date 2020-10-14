import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccumingPage } from './vaccuming.page';

describe('VaccumingPage', () => {
  let component: VaccumingPage;
  let fixture: ComponentFixture<VaccumingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaccumingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccumingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
