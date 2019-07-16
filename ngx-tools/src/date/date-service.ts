import { Injectable } from '@angular/core';

@Injectable()
export class DateService {
  public getCurrentDate() {
    return new Date();
  }
}
