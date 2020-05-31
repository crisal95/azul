import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WrapperComponent} from './wrapper.component';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {ContentWrapperComponent} from '../content-wrapper/content-wrapper.component';

import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { RouterTestingModule } from '@angular/router/testing';

describe('WrapperComponent', () => {
  let component: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        RouterTestingModule
      ],
      declarations: [WrapperComponent, SidebarComponent, ContentWrapperComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
