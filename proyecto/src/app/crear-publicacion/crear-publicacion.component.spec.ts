import {async, ComponentFixture, TestBed, tick, fakeAsync} from '@angular/core/testing';

import {CrearPublicacionComponent} from './crear-publicacion.component';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {RegistrarUsuarioComponent} from '../registrar-usuario/registrar-usuario.component';
import {AuthorComponent} from '../author/author.component';
import {LoginComponent} from '../login/login.component';
import {WrapperComponent} from '../wrapper/wrapper.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {FileUploaderComponent} from '../file-uploader/file-uploader.component';
import {AppRoutingModule} from '../app-routing.module';
import {HomeComponent} from '../home/home.component';
import {ContentWrapperComponent} from '../content-wrapper/content-wrapper.component';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {ToastrModule} from 'ngx-toastr';
import { EditarInformacionModalComponent } from '../editar-informacion-modal/editar-informacion-modal.component';
import { PublicacionComponent } from '../publicacion/publicacion.component';
import { RecuperarPasswordComponent } from '../recuperar-password/recuperar-password.component';
import { UsersListComponent } from '../users-list/users-list.component';
import { By } from '@angular/platform-browser';


describe('CrearPublicacionComponent', () => {
  let component: CrearPublicacionComponent;
  let fixture: ComponentFixture<CrearPublicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, AppRoutingModule, ToastrModule.forRoot()],
      declarations: [
        CrearPublicacionComponent,
        SidebarComponent,
        RegistrarUsuarioComponent,
        AuthorComponent,
        LoginComponent,
        WrapperComponent,
        FileUploaderComponent,
        SidebarComponent,
        HomeComponent,
        ContentWrapperComponent,
        PublicacionComponent,
        EditarInformacionModalComponent,
        RecuperarPasswordComponent,
        UsersListComponent
      ],
      providers: [
        {provide: AngularFireAuth, useValue: mockAngularFireAuth},
        {provide: AngularFireDatabase, useValue: mockDatabase},
        {provide: AngularFireStorage, useValue: null}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


   //prueba que boton de submit este habilitado cuando form lleno
   it('should call the onSubmit method', fakeAsync(() => {
    spyOn(component, 'onSubmit');
    component.publicacionForm.controls['texto'].setValue('prueba');
    let button2 = fixture.debugElement.query(By.css('.botonPublicar'));
    button2.triggerEventHandler('click', null);
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.onSubmit).toHaveBeenCalledTimes(1);
    });
  }));

  //prueba que form sin llenar sea invalido
  it('form should be invalid', async(() => {
    component.publicacionForm.controls['texto'].setValue('');
    expect(component.publicacionForm.valid).toBeFalsy();
  }));

  // prueba que form llenado sea valido
  it('form should be valid', async(() => {
    component.publicacionForm.controls['texto'].setValue('prueba');
    expect(component.publicacionForm.valid).toBeTruthy();
  }));

  it('should assign a string value', () => {
    component.onImagePicked("Prueba");
    expect(component.uploadedFileUrl).toBe("Prueba");
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
