import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {
  select,
  Store,
} from '@ngrx/store';
import {
  forkJoin,
  Observable,
  of,
} from 'rxjs';
import {
  filter,
  map,
  withLatestFrom,
} from 'rxjs/operators';

import { ClaimMap } from '../claim-map';
import { tokenFor } from '../selectors';
import { jwtDecode } from '../../jwt-decode';

export interface TokenClaims<C = ClaimMap> {
  token: keyof C;
  requiredClaims: string[];
}

export interface ITokenClaimGuardRouteData<C = ClaimMap> {
  requiredTokenClaims?: TokenClaims<C>[];
}

export const allClaimsAreValid = (decode: any) => (
  resp: [TokenClaims, string][]
) => resp.map(
  ([tokenClaims, token]: [TokenClaims, string]) => {
    const validClaims = decode(token);
    return tokenClaims.requiredClaims.every(
      (claim: string) => validClaims[claim]
    );
  }
).every((allValid: boolean) => allValid);

export const mapTokenClaims = (store: Store<any>) => (
  tokenClaims: TokenClaims
): Observable<[TokenClaims, string | undefined]> => of(tokenClaims).pipe(
  withLatestFrom(
    store.pipe(select(tokenFor<any, any>(tokenClaims.token)))
  )
);

@Injectable()
export class TokenClaimGuard implements CanActivate {

  public canActivate(route: { data: ITokenClaimGuardRouteData }): Observable<boolean> {
    if (!route.data.requiredTokenClaims) {
      return of(true);
    }

    const tokensAndRequiredClaims$ = route.data.requiredTokenClaims.map(
      mapTokenClaims(this.store)
    );

    return forkJoin(...tokensAndRequiredClaims$).pipe(
      filter((res: [TokenClaims, string][]) => !!res),
      map(allClaimsAreValid(jwtDecode)),
    );
  }

  constructor(public store: Store<any>) {}

}
