import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RecuperarPasswordComponent} from './recuperar-password.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import {HomeComponent} from '../home/home.component';
import {AuthorComponent} from '../author/author.component';
import {LoginComponent} from '../login/login.component';
import {RegistrarUsuarioComponent} from '../registrar-usuario/registrar-usuario.component';
import {CrearPublicacionComponent} from '../crear-publicacion/crear-publicacion.component';
import {EditarInformacionModalComponent} from '../editar-informacion-modal/editar-informacion-modal.component';
import {PublicacionComponent} from '../publicacion/publicacion.component';
import {FileUploaderComponent} from '../file-uploader/file-uploader.component';
import {UsersListComponent} from '../users-list/users-list.component';

import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { ToastrModule } from 'ngx-toastr';

describe('RecuperarPasswordComponent', () => {
  let component: RecuperarPasswordComponent;
  let fixture: ComponentFixture<RecuperarPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        ToastrModule.forRoot(),
      ],
      declarations: [
        RecuperarPasswordComponent,
        HomeComponent,
        AuthorComponent,
        LoginComponent,
        RegistrarUsuarioComponent,
        CrearPublicacionComponent,
        EditarInformacionModalComponent,
        PublicacionComponent,
        FileUploaderComponent,
        UsersListComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
