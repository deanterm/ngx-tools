import { Injectable } from '@angular/core';


/**
 * Return the native window object
 *
 * @return The native window object
 */
function realWindow(): Window {
  // return the native window object
  return window;
}


/**
 * Define a service that exposes the native window object
 */
@Injectable({providedIn: 'root'})
export class TsWindowService {

  /**
   * Return a function that returns the native window object
   *
   * @return The function that returns the native window object
   */
  public get nativeWindow(): Window {
    return realWindow();
  }

}
