import { TestBed } from '@angular/core/testing';

import { MytoastService } from './mytoast.service';

describe('MytoastService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MytoastService = TestBed.get(MytoastService);
    expect(service).toBeTruthy();
  });
});
