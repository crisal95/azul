import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PublicacionComponent} from './publicacion.component';
import {RouterModule} from '@angular/router';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from 'src/environments/environment';
import {ToastrModule} from 'ngx-toastr';
import {UserData, PostData} from '../shared/models';


describe('PublicacionComponent', () => {
  let component: PublicacionComponent;
  let fixture: ComponentFixture<PublicacionComponent>;
  let compiled;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        RouterModule.forRoot([]),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        ToastrModule.forRoot()
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
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should render app-wrapper', () => {
    expect(compiled.querySelector('img').textContent).toBeDefined();
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
