import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import {HomeComponent} from '../home/home.component';
import {AuthorComponent} from '../author/author.component';
import {FileUploaderComponent} from '../file-uploader/file-uploader.component';
import {ToastrModule} from 'ngx-toastr';

import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {RegistrarUsuarioComponent} from '../registrar-usuario/registrar-usuario.component';
import {CrearPublicacionComponent} from '../crear-publicacion/crear-publicacion.component';
import { PublicacionComponent } from '../publicacion/publicacion.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        ToastrModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule
      ],
      declarations: [
        LoginComponent,
        HomeComponent,
        AuthorComponent,
        FileUploaderComponent,
        RegistrarUsuarioComponent,
        CrearPublicacionComponent,
        PublicacionComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
