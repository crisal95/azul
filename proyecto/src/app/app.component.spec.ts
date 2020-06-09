import {TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {NotificationComponent} from './notification/notification.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ToastrModule} from 'ngx-toastr';

import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { WrapperComponent } from './wrapper/wrapper.component';
import { ContentWrapperComponent } from './content-wrapper/content-wrapper.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CrearPublicacionComponent } from './crear-publicacion/crear-publicacion.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgxSpinnerModule,
        ToastrModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [AppComponent,
         HeaderComponent,
          NotificationComponent,
          WrapperComponent,
          ContentWrapperComponent,
          SidebarComponent,
          CrearPublicacionComponent,
          PublicacionComponent,
          FileUploaderComponent
        ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'BlueTweet'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('BlueTweet');
  });

  it('should render app-wrapper', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-wrapper').textContent).toBeDefined();
  });

  it('should render app-notification tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-notification').textContent).toBeDefined();
  });

  it('should render router-outlet tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('router-outlet').textContent).toBeDefined();
  });

  it('should render ngx-spinner tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('ngx-spinner').textContent).toBeDefined();
  });
});
