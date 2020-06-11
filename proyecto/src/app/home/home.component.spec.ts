import {async, ComponentFixture, TestBed, fakeAsync} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {routes} from '../app-routing.module';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthorComponent} from '../author/author.component';
import {LoginComponent} from '../login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FileUploaderComponent} from '../file-uploader/file-uploader.component';
import {ToastrModule} from 'ngx-toastr';

import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {SpinnerService} from '../shared/spinner.service';
import { RegistrarUsuarioComponent } from '../registrar-usuario/registrar-usuario.component';
import { CrearPublicacionComponent } from '../crear-publicacion/crear-publicacion.component';
import { EditarInformacionModalComponent } from '../editar-informacion-modal/editar-informacion-modal.component';
import { PublicacionComponent } from '../publicacion/publicacion.component';
import { RecuperarPasswordComponent } from '../recuperar-password/recuperar-password.component';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

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

  // Spies para SpinnerService
  let spinnerService: SpinnerService;
  let spinnerSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot()
        // AngularFireModule.initializeApp(environment.firebaseConfig),
        // AngularFireAuthModule,
        // AngularFireDatabaseModule,
        // AngularFireStorageModule
      ],

      declarations: [
        HomeComponent,
        AuthorComponent,
        LoginComponent,
        FileUploaderComponent,
        RegistrarUsuarioComponent,
        CrearPublicacionComponent,
        PublicacionComponent,
        EditarInformacionModalComponent,
        RecuperarPasswordComponent
      ],

      // Aqui le paso los mocks al componente
      providers: [
        {provide: AngularFireAuth, useValue: mockAngularFireAuth},
        {provide: AngularFireDatabase, useValue: mockDatabase},
        {provide: AngularFireStorage, useValue: null}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', fakeAsync(() => {
    component.ngOnInit();
  }));
});
