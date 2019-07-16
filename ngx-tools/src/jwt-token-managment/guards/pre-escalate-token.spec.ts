import {
  async,
  TestBed,
} from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';

import { ClaimMap } from '../claim-map';
import {
  IPreEscalateTokensRouteData,
  PreEscalateTokenService,
} from './pre-escalate-token';

interface TestClaimMap extends ClaimMap {
  'test1': any;
  'test2': any;
  'test3': any;
}

describe(`PreEscalateTokenService`, function() {
  let guard: PreEscalateTokenService<any, TestClaimMap>;
  let mockStore: {
    pipe: jest.MockInstance<any, any>;
    dispatch: jest.MockInstance<any, any>;
  };

  beforeEach(async(() => {
    mockStore = {
      pipe: jest.fn(),
      dispatch: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        PreEscalateTokenService,
        {
          provide: Store,
          useValue: mockStore,
        },
      ],
    });

    guard = TestBed.get<PreEscalateTokenService<any, TestClaimMap>>(PreEscalateTokenService);
  }));

  afterEach(() => {
    mockStore.pipe.mockClear();
    mockStore.dispatch.mockClear();
  });


  describe(`canActivate`, () => {

    test('should return observable true when preEscalate data is not present', () => {
      const expected = cold('(a|)', { a: true });
      expect(guard.canActivate({ data: {}})).toBeObservable(expected);
      expect(mockStore.dispatch).not.toHaveBeenCalled();
    });

    test('should return observable true', () => {
      const expected = cold('(a|)', { a: true });
      const routeData: IPreEscalateTokensRouteData<TestClaimMap> = {
        preEscalate: {
          tokens: [
            'test1',
            'test2',
            'test3',
          ],
        },
      };
      expect(guard.canActivate({ data: routeData })).toBeObservable(expected);
      expect(mockStore.dispatch).toHaveBeenCalledTimes(3);
    });

  });

});
