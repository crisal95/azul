import {async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';

import {AuthorComponent} from './author.component';

import {routes} from '../app-routing.module';
import {RouterTestingModule} from '@angular/router/testing';
import {HomeComponent} from '../home/home.component';
import {LoginComponent} from '../login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FileUploaderComponent} from '../file-uploader/file-uploader.component';
import {PublicacionComponent} from '../publicacion/publicacion.component';
import {UsersListComponent} from '../users-list/users-list.component';

import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {ToastrModule} from 'ngx-toastr';

import {RouteGuard} from '../shared/route-guard';
import {RegistrarUsuarioComponent} from '../registrar-usuario/registrar-usuario.component';
import {CrearPublicacionComponent} from '../crear-publicacion/crear-publicacion.component';
import {EditarInformacionModalComponent} from '../editar-informacion-modal/editar-informacion-modal.component';
import {UserData} from '../shared/models';
import {RecuperarPasswordComponent} from '../recuperar-password/recuperar-password.component';
import {By} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

describe('AuthorComponent', () => {
  let component: AuthorComponent;
  let fixture: ComponentFixture<AuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AngularFireStorageModule,
        ToastrModule.forRoot()
      ],
      declarations: [
        AuthorComponent,
        HomeComponent,
        LoginComponent,
        FileUploaderComponent,
        RegistrarUsuarioComponent,
        CrearPublicacionComponent,
        EditarInformacionModalComponent,
        PublicacionComponent,
        RecuperarPasswordComponent,
        UsersListComponent
      ],
      providers: [RouteGuard]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorComponent);
    component = fixture.componentInstance;
    component.user = userData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call unfollowUser() when #buttonUnfollowUser un clicked', fakeAsync(() => {
    component.userConsultingHisPersonalProfile = false;
    component.userIsFollowingVisitedProfile = true;
    fixture.detectChanges();
    spyOn(component, 'unfollowUser');
    // let button = fixture.debugElement.nativeElement.querySelector('button');
    let button = fixture.debugElement.query(By.css('#buttonUnfollowUser'));
    button.triggerEventHandler('click', null);
    tick(); // simulates the passage of time until all pending asynchronous activities finish
    fixture.detectChanges();
    expect(component.unfollowUser).toHaveBeenCalled();
  }));
});

describe('AuthorComponentVisitedByActualUser', () => {
  let component: AuthorComponent;
  let fixture: ComponentFixture<AuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AngularFireStorageModule,
        ToastrModule.forRoot()
      ],
      declarations: [
        AuthorComponent,
        HomeComponent,
        LoginComponent,
        FileUploaderComponent,
        RegistrarUsuarioComponent,
        CrearPublicacionComponent,
        EditarInformacionModalComponent,
        PublicacionComponent,
        RecuperarPasswordComponent,
        UsersListComponent
      ],
      providers: [RouteGuard]
    })
      .compileComponents()
      .then(() => {});
  }));

  beforeEach(() => {
    let mockActiveRoute = {
      snapshot: {
        queryParams: {
          userId: 'H01iw0h8I9cJvJYZafONCPPmujg1'
        }
      }
    };

    TestBed.configureTestingModule({
      providers: [{provide: ActivatedRoute, useFactory: () => mockActiveRoute}]
    });

    fixture = TestBed.createComponent(AuthorComponent);
    component = fixture.componentInstance;
    component.actualUser = 'H01iw0h8I9cJvJYZafONCPPmujg1';
    fixture.detectChanges();
  });

  it('should display users own profile', async(() => {
    let spyOnMethod = spyOn(component, 'getParams').and.callThrough();
    fixture.detectChanges();
    expect(component.actualUser).toEqual('H01iw0h8I9cJvJYZafONCPPmujg1');
    expect(component.userIsFollowingVisitedProfile).toBe(false);
  }));
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
