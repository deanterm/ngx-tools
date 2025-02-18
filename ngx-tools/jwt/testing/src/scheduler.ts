import { InjectionToken } from '@angular/core';
import { Scheduler } from 'rxjs';


// TODO: Scheduler is deprecated: Scheduler is an internal implementation detail of RxJS, and should not be used directly. Rather, create
// your own class and implement SchedulerLike
// tslint:disable-next-line deprecation
export const SCHEDULER = new InjectionToken<Scheduler>('scheduler');
