import {
  async,
  TestBed,
} from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';

import { of } from 'rxjs';
import {
  allClaimsAreValid,
  mapTokenClaims,
  TokenClaimGuard,
  TokenClaims,
} from './token-claim';

interface TestClaims {
  test: any;
}

describe(`PreEscalateTokenService`, function() {
  let guard: TokenClaimGuard;
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
        TokenClaimGuard,
        {
          provide: Store,
          useValue: mockStore,
        },
      ],
    });

    guard = TestBed.get<TokenClaimGuard>(TokenClaimGuard);
  }));

  afterEach(() => {
    mockStore.pipe.mockClear();
    mockStore.dispatch.mockClear();
  });

  describe('allClaimsAreValid', () => {
    test('should return true when expected claims are valid', () => {
      const testJwtDecode = () => ({ test: true });
      const test: [TokenClaims, string][] = [
        [
          {
            token: 'test',
            requiredClaims: ['test'],
          },
          'someTokenToDecode',
        ],
      ];
      expect(
        allClaimsAreValid(testJwtDecode)(test)
      ).toBeTruthy();
    });

    test('should return true when multiple TokenClaims are passed in', () => {
      const testJwtDecode = () => ({ test: true });
      const test: [TokenClaims, string][] = [
        [
          {
            token: 'test1',
            requiredClaims: ['test'],
          },
          'someTokenToDecode',
        ],
        [
          {
            token: 'test2',
            requiredClaims: ['test'],
          },
          'someTokenToDecode',
        ],
      ];
      expect(
        allClaimsAreValid(testJwtDecode)(test)
      ).toBeTruthy();
    });

    test('should return false when not all claims are valid', () => {
      const testJwtDecode = (token: string) => {
        switch (token) {
          case 'test1': return { test1: true };
          case 'test2': return {
            test1: true,
            test2: false,
          };
          default: return { test1: false };
        }
      };
      const test: [TokenClaims, string][] = [
        [
          {
            token: 'test1',
            requiredClaims: ['test1'],
          },
          'someTokenToDecode',
        ],
        [
          {
            token: 'test2',
            requiredClaims: ['test1', 'test2'],
          },
          'someTokenToDecode',
        ],
      ];
      expect(
        allClaimsAreValid(testJwtDecode)(test)
      ).toBeFalsy();
    });
  });

  describe('mapTokenClaims', () => {
    test('should return observable of [TokenClaims, selectedToken]', () => {
      mockStore.pipe.mockReturnValue(of('testToken'));
      const tokenClaims: TokenClaims<TestClaims> = {
        token: 'test',
        requiredClaims: ['test'],
      };
      const expected = cold('(a|)', { a: [tokenClaims, 'testToken'] });
      expect(
        mapTokenClaims(mockStore as unknown as Store<any>)(tokenClaims as TokenClaims<any>)
      ).toBeObservable(expected);
    });
  });

  describe(`canActivate`, () => {
    test('should return observable true when requiredTokenClaims data is not present', () => {
      const expected = cold('(a|)', { a: true });
      expect(guard.canActivate({ data: {}})).toBeObservable(expected);
      expect(mockStore.dispatch).not.toHaveBeenCalled();
    });

  });

});
