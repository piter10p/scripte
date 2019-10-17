import { TestBed } from '@angular/core/testing';

import { KeyEventConsumerRegistryService } from './key-event-consumer-registry.service';

describe('KeyEventConsumerRegistryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KeyEventConsumerRegistryService = TestBed.get(KeyEventConsumerRegistryService);
    expect(service).toBeTruthy();
  });
});
