/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { TestSolutionService } from './test-solution.service';

describe('TestSolutionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestSolutionService]
    });
  });

  it('should ...', inject([TestSolutionService], (service: TestSolutionService) => {
    expect(service).toBeTruthy();
  }));
});
