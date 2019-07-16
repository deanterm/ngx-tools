import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  Observable,
  of,
} from 'rxjs';

import { EscalateJwtToken } from '../public-api';

export interface IPreEscalateTokensRouteData<ClaimMap> {
  preEscalate?: {
    tokens: Extract<keyof ClaimMap, string>[];
  };
}

@Injectable()
export class PreEscalateTokenService<AppState, ClaimMap> implements CanActivate {

  public canActivate(route: { data: IPreEscalateTokensRouteData<ClaimMap> }): Observable<boolean> {
    if (!route.data.preEscalate) {
      return of(true);
    }
    route.data.preEscalate.tokens.forEach(
      tokenName => this.store.dispatch(new EscalateJwtToken<ClaimMap>(tokenName)),
    );
    return of(true);
  }

  constructor(public store: Store<AppState>) {}

}
