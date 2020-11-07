import { TestBed } from '@angular/core/testing';

import { Html2canvasServiceService } from './html2canvas-service.service';

describe('Html2canvasServiceService', () => {
  let service: Html2canvasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Html2canvasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
