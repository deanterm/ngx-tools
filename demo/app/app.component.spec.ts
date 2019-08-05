import { HttpClientModule } from '@angular/common/http';
import {
  async,
  TestBed,
} from '@angular/core/testing';
import {
  TsDocumentService,
  TsWindowService,
} from '@terminus/ngx-tools/';
import {
  TsDocumentServiceMock,
  TsWindowServiceMock,
} from '@terminus/ngx-tools/testing';

import { AppComponent } from './app.component';


describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        {
          provide: TsWindowService,
          useClass: TsWindowServiceMock,
        },
        {
          provide: TsDocumentService,
          useClass: TsDocumentServiceMock,
        },
      ],
      declarations: [
        AppComponent,
      ],
    }).compileComponents();
  }));


  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});

describe(`test block`, () => {

  it(`should do something`, () => {
    expect(true).toEqual(true);
  });

});
