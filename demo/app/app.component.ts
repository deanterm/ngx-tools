/* eslint-disable no-console */
import { Component } from '@angular/core';
console.log('in AppComponent');
@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'App';
}

/* eslint-disable no-console */
/* import {
  Component,
  OnInit,
} from '@angular/core';

import { VERSION } from '@terminus/ngx-tools/utilities';
console.log('ngx-tools VERSION: ', VERSION);


@Component({
  selector: 'demo-root',
  template: '', // './app.component.html',   styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public version: string = VERSION.full;

  public ngOnInit() {
    console.log('AppComponent: ngOnInit');
  }
}
 */