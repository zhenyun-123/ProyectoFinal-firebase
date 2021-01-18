import { TestBed } from '@angular/core/testing';

import { JugueteServiceService } from './juguete.service.service';

describe('JugueteServiceService', () => {
  let service: JugueteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JugueteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
