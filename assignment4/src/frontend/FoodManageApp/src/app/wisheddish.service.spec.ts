import { TestBed } from '@angular/core/testing';

import { WisheddishService } from './wisheddish.service';

describe('WisheddishService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WisheddishService = TestBed.get(WisheddishService);
    expect(service).toBeTruthy();
  });
});
