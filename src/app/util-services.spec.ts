import { TestBed } from '@angular/core/testing';

import { UtilServices } from './util-services';

describe('UtilServices', () => {
  let service: UtilServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
