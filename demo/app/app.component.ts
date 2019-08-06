/* eslint-disable no-console */
import {
  Component,
  OnInit,
} from '@angular/core';

import { VERSION } from '@terminus/ngx-tools/utilities';
console.log('ngx-tools VERSION: ', VERSION);


@Component({
  selector: 'demo-root',
  templateUrl: './home/home.component.html', // './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public version: string = VERSION.full;

  public ngOnInit() {
    console.log('AppComponent: ngOnInit');
  }
}
