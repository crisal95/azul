import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditarInformacionModalComponent} from './editar-informacion-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireStorage} from '@angular/fire/storage';
import {HomeComponent} from '../home/home.component';
import {routes} from '../app-routing.module';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthorComponent} from '../author/author.component';
import {LoginComponent} from '../login/login.component';
import {FileUploaderComponent} from '../file-uploader/file-uploader.component';
import {AngularFireDatabase} from '@angular/fire/database';
import {RegistrarUsuarioComponent} from '../registrar-usuario/registrar-usuario.component';
import {CrearPublicacionComponent} from '../crear-publicacion/crear-publicacion.component';
import {PublicacionComponent} from '../publicacion/publicacion.component';
import {RecuperarPasswordComponent} from '../recuperar-password/recuperar-password.component';
import { UsersListComponent } from '../users-list/users-list.component';

describe('EditarInformacionModalComponent', () => {
  let component: EditarInformacionModalComponent;
  let fixture: ComponentFixture<EditarInformacionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes)
        //AngularFireModule.initializeApp(environment.firebaseConfig),
        //AngularFireAuthModule,
        //AngularFireDatabaseModule,
        //AngularFireStorageModule
      ],
      declarations: [
        EditarInformacionModalComponent,
        HomeComponent,
        AuthorComponent,
        LoginComponent,
        FileUploaderComponent,
        RegistrarUsuarioComponent,
        CrearPublicacionComponent,
        PublicacionComponent,
        RecuperarPasswordComponent,
        UsersListComponent
      ],
      providers: [
        {provide: AngularFireAuth, useValue: mockAngularFireAuth},
        {provide: AngularFireStorage, useValue: null},
        {provide: AngularFireDatabase, useValue: mockDatabase}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarInformacionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// Mock de los datos de un usuario
const datosUsuario = {
  uid: 'patito'
};
// Mock del objeto AngularFireAuth
const mockAngularFireAuth: any = {
  currentUser: Promise.resolve(datosUsuario)
};
// Mock de la base de datos
const mockDatabase: any = {
  list() {
    return {
      snapshotChanges() {
        return {subscribe() {}};
      }
    };
  }
};
