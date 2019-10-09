import { TestBed } from '@angular/core/testing';

import { DocumentBodyService } from './document-body.service';

describe('DocumentBodyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentBodyService = TestBed.get(DocumentBodyService);
    expect(service).toBeTruthy();
  });
});
