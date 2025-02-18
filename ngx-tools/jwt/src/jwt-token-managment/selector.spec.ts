import { JwtTokenProviderState } from './reducer';
import * as selectors from './selectors';
import {
  JWT_TOKEN_MANAGEMENT_STATE_TOKEN,
  State,
} from './state';


interface MockClaimMap {
  foo: { fooClaim: string };
  bar: { barClaim: string };
}

interface MinimumStoreRequirements {
  [JWT_TOKEN_MANAGEMENT_STATE_TOKEN]: {
    jwtTokens: JwtTokenProviderState<MockClaimMap>;
  };
}

type MockState = MinimumStoreRequirements | State;


describe('JWT Selectors', function() {
  let state: MockState;
  let tokenStorageState: JwtTokenProviderState<MockClaimMap>;

  beforeEach(() => {
    tokenStorageState = {
      initialTokenStatus: 'loaded',
      tokens: {},
    };
    state = {[JWT_TOKEN_MANAGEMENT_STATE_TOKEN]: {jwtTokens: tokenStorageState}};
  });


  describe('getTokens', () => {

    test(`returns all tokens`, () => {
      tokenStorageState.tokens.bar = 'FooBar';

      expect(
        selectors.getTokens<MockClaimMap>()(state as State),
      ).toEqual({bar: 'FooBar'});
    });

  });


  describe('tokenFor', () => {

    test(`returns the token for the specific service`, () => {
      tokenStorageState.tokens.foo = 'FooBar';

      expect(
        selectors.tokenFor<MockClaimMap, 'foo'>('foo')(state as State),
      ).toEqual('FooBar');
    });


    test(`returns the default token if the service token is unset`, () => {
      tokenStorageState.defaultToken = 'FooBarish';

      expect(
        selectors.tokenFor<MockClaimMap, 'foo'>('foo')(state as State),
      ).toEqual('FooBarish');
    });

  });


  describe(`claimsFor`, () => {

    test(`provides the decoded claims`, () => {
      // eslint-disable-next-line max-len
      tokenStorageState.defaultToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb29DbGFpbSI6IjEyMzQ1In0.50A0G9bhMCl27gUlLEJ0PsK0Ce3hnrR71dZ9oh62DqA';

      expect(
        selectors.claimsFor<MockClaimMap, 'foo'>('foo')(state as State),
      ).toEqual({fooClaim: '12345'});
    });


    test(`should return null if no token is set`, () => {
      expect(
        selectors.claimsFor<MockClaimMap, 'foo'>('foo')(state as State),
      ).toEqual(null);
    });


    test(`should be null if the token is garbage`, () => {
      tokenStorageState.defaultToken = 'asdfljsaflkj.asdfsadf.sdfddsf';

      expect(
        selectors.claimsFor<MockClaimMap, 'foo'>('foo')(state as State),
      ).toEqual(null);
    });

  });


  describe(`claimValue`, () => {

    test(`provides the decoded claims`, () => {
      // eslint-disable-next-line max-len
      tokenStorageState.defaultToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb29DbGFpbSI6IjEyMzQ1In0.50A0G9bhMCl27gUlLEJ0PsK0Ce3hnrR71dZ9oh62DqA';

      const selector = selectors.claimValue<MockClaimMap, 'foo', 'fooClaim'>('foo', 'fooClaim');

      expect(
        selector(state as State),
      ).toEqual('12345');
    });


    test(`should return null if no token is set`, () => {
      const selector = selectors.claimValue<MockClaimMap, 'foo', 'fooClaim'>('foo', 'fooClaim');

      expect(
        selector(state as State),
      ).toEqual(null);
    });


    test(`should be null if the token is garbage`, () => {
      tokenStorageState.defaultToken = 'asdfljsaflkj.asdfsadf.sdfddsf';

      const selector = selectors.claimValue<MockClaimMap, 'foo', 'fooClaim'>('foo', 'fooClaim');

      expect(
        selector(state as State),
      ).toEqual(null);
    });

  });

});
