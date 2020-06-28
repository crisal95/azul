import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PublicacionComponent} from './publicacion.component';
import {RouterModule} from '@angular/router';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {UserData, PostData} from '../shared/models';


describe('PublicacionComponent', () => {
  let component: PublicacionComponent;
  let fixture: ComponentFixture<PublicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        RouterModule.forRoot([]),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule
      ],
      declarations: [PublicacionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicacionComponent);
    component = fixture.componentInstance;
    component.userData = userData;
    component.postData = postData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

let userData: UserData = {
  userId: 'prueba',
  fullName: 'prueba',
  created: 0,
  lastName: 'prueba',
  firstName: 'prueba',
  userName: 'prueba1',
  lastUpdate: 0,
  email: '',
  img: '',
  followers: null,
  following: null
};

let postData: PostData = {
  key: '',
  content: '',
  img: '',
  created: 0,
  userId: '',
  creationDate: ''
};
