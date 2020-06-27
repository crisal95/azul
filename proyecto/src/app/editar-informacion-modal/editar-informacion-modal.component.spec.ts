import {async, ComponentFixture, TestBed, tick, fakeAsync} from '@angular/core/testing';

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
import { ToastrModule } from 'ngx-toastr';
import { By } from '@angular/platform-browser';

describe('EditarInformacionModalComponent', () => {
  let component: EditarInformacionModalComponent;
  let fixture: ComponentFixture<EditarInformacionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes),
        ToastrModule.forRoot()
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


   //prueba que boton de submit este habilitado cuando form lleno
   it('should call the onSubmit method', fakeAsync(() => {
    spyOn(component, 'onSubmit');
    component.registerForm.controls['lastName'].setValue('prueba');
    component.registerForm.controls['firstName'].setValue('prueba');
    component.registerForm.controls['userName'].setValue('prueba');

    let button2 = fixture.debugElement.query(By.css('#boton'));
    button2.triggerEventHandler('click', null);
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.onSubmit).toHaveBeenCalledTimes(1);
    });
  }));


   //prueba que boton de submit este habilitado cuando form lleno
   it('should call the onSubmit method', fakeAsync(() => {
    spyOn(component, 'onSubmitPassword');
    component.passwordForm.controls['newPassword'].setValue('prueba');

    let button2 = fixture.debugElement.query(By.css('#botonPassword'));
    button2.triggerEventHandler('click', null);
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.onSubmitPassword).toHaveBeenCalledTimes(1);
    });
  }));

  //prueba que form sin llenar sea invalido
  it('form should be invalid', async(() => {
    component.registerForm.controls['lastName'].setValue('');
    component.registerForm.controls['firstName'].setValue('');
    component.registerForm.controls['userName'].setValue('');
    expect(component.registerForm.valid).toBeFalsy();
  }));

  // prueba que form llenado sea valido
  it('form should be valid', async(() => {
    component.registerForm.controls['lastName'].setValue('prueba');
    component.registerForm.controls['firstName'].setValue('prueba');
    component.registerForm.controls['userName'].setValue('prueba');
    expect(component.registerForm.valid).toBeTruthy();
  }));


  //prueba que form sin llenar sea invalido
  it('form should be invalid', async(() => {
    component.passwordForm.controls['newPassword'].setValue('');
    expect(component.passwordForm.valid).toBeFalsy();
  }));

  // prueba que form llenado sea valido
  it('form should be valid', async(() => {
    component.passwordForm.controls['newPassword'].setValue('prueba');
    expect(component.passwordForm.valid).toBeTruthy();
  }));


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
