import { HttpErrorResponse } from '@angular/common/http';
import {
  coerceDateProperty,
  coerceNumberProperty,
} from '@terminus/ngx-tools/coercion';
import {
  MonoTypeOperatorFunction,
  Observable,
  range,
  Scheduler,
  throwError,
  timer,
  zip,
} from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';
import {
  mergeMap,
  retryWhen,
  take,
} from 'rxjs/operators';

import { exponentialBackoffDelayCalculator } from './../retry-with-backoff/delay-calculator';


export interface HttpRetryWithBackoff {
  retries: number;
  delayCalculator: (attempt: number) => number;
  // TODO: Scheduler is marked as deprecated to stop others from using although it is not technically deprecated from what I can tell. The
  // 'correct' path would be to create our own class extending `SchedulerLike`. https://github.com/GetTerminus/ngx-tools/issues/287
  // tslint:disable-next-line no-any deprecation
  scheduler: Scheduler | any;
}

const DEFAULT_RETRY_COUNT = 2;
const ERROR_CODE_TOO_MANY_REQUESTS = 429;
const ERROR_CODE_500_MIN = 500;
const ERROR_CODE_500_MAX = 599;


export function httpRetryer<T>({
  retries = DEFAULT_RETRY_COUNT,
  delayCalculator = exponentialBackoffDelayCalculator({}),
  scheduler = async,
}: Partial<HttpRetryWithBackoff>): MonoTypeOperatorFunction<T> {
  return retryWhen((errors: Observable<HttpErrorResponse | Error>) => zip(
    errors,
    range(1, retries + 1),
  ).pipe(
    mergeMap(([err, retry]) => {
      if (retry > retries || !isConsideredError(err)) {
        return throwError(err);
      }

      let waitTime: number | Date = delayCalculator(retry);

      if (err.status === ERROR_CODE_TOO_MANY_REQUESTS) {
        const headerWaitTime = extractRetryAfterTime(err);
        waitTime = headerWaitTime || waitTime;
      }

      // tslint:disable-next-line no-unsafe-any
      return timer(waitTime, scheduler).pipe(take(1));
    }),
  ));
}


function extractRetryAfterTime(err: HttpErrorResponse): number | Date | null {
  const retryHeaderValue = err.headers.get('Retry-After');

  if (retryHeaderValue) {
    return coerceNumberProperty(retryHeaderValue, null)
      || coerceDateProperty(retryHeaderValue, null);
  }
  return null;

}


function isConsideredError(err: HttpErrorResponse | Error): err is HttpErrorResponse {
  if (err.hasOwnProperty('status') && err.hasOwnProperty('headers')) {
    const e = err as HttpErrorResponse;
    return e.status === 0
      || e.status === ERROR_CODE_TOO_MANY_REQUESTS
      || (e.status >= ERROR_CODE_500_MIN && e.status <= ERROR_CODE_500_MAX);
  }
  return false;


}
