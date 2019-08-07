import {
  TestBed,
  async,
} from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {
  TsWindowService,
  TsDocumentService,
} from '@terminus/ngx-tools';
import {
  TsWindowServiceMock,
  TsDocumentServiceMock,
} from '@terminus/ngx-tools/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
console.log(AppComponent);

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

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

/* import { 
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { createComponent } from '@terminus/ngx-tools/testing';
import { AppComponent } from './app.component';
console.log(AppComponent);

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

/* describe('AppComponent, part 2', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    fixture = createComponent(AppComponent, [], []);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test(`should exist`, function() {
    expect(component).toBeTruthy();
  });

}); */