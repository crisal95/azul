import {async, ComponentFixture, TestBed, tick, fakeAsync} from '@angular/core/testing';
import {RegistrarUsuarioComponent} from './registrar-usuario.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AppRoutingModule} from '../app-routing.module';
import {HomeComponent} from '../home/home.component';
import {LoginComponent} from '../login/login.component';
import {AuthorComponent} from '../author/author.component';
import {FileUploaderComponent} from '../file-uploader/file-uploader.component';
import {ToastrModule} from 'ngx-toastr';
import {CrearPublicacionComponent} from '../crear-publicacion/crear-publicacion.component';
import {EditarInformacionModalComponent} from '../editar-informacion-modal/editar-informacion-modal.component';
import {PublicacionComponent} from '../publicacion/publicacion.component';
import {RecuperarPasswordComponent} from '../recuperar-password/recuperar-password.component';
import {UsersListComponent} from '../users-list/users-list.component';
import { By } from '@angular/platform-browser';

describe('RegistrarUsuarioComponent', () => {
  let component: RegistrarUsuarioComponent;
  let fixture: ComponentFixture<RegistrarUsuarioComponent>;
  let button: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        ToastrModule.forRoot(),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AppRoutingModule
      ],
      declarations: [
        RegistrarUsuarioComponent,
        HomeComponent,
        LoginComponent,
        AuthorComponent,
        FileUploaderComponent,
        CrearPublicacionComponent,
        PublicacionComponent,
        EditarInformacionModalComponent,
        RecuperarPasswordComponent,
        UsersListComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


   //prueba que boton de submit este habilitado cuando form lleno
   it('should call the onSubmit method', fakeAsync(() => {
    component.registerForm.controls['email'].setValue('prueba@prueba.com');
    component.registerForm.controls['password'].setValue('1234');
    component.registerForm.controls['lastName'].setValue('prueba');
    component.registerForm.controls['firstName'].setValue('prueba');
    component.registerForm.controls['userName'].setValue('prueba');
    spyOn(component, 'onSubmit');
    let button2 = fixture.debugElement.query(By.css('#boton'));
    button2.triggerEventHandler('click', null);
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.onSubmit).toHaveBeenCalledTimes(1);
    });
  }));

  //prueba que form sin llenar sea invalido
  it('form should be invalid', async(() => {
    component.registerForm.controls['email'].setValue('');
    component.registerForm.controls['password'].setValue('');
    component.registerForm.controls['lastName'].setValue('');
    component.registerForm.controls['firstName'].setValue('');
    component.registerForm.controls['userName'].setValue('');
    expect(component.registerForm.valid).toBeFalsy();
  }));

  // prueba que form llenado sea valido
  it('form should be valid', async(() => {
    component.registerForm.controls['email'].setValue('prueba@prueba.com');
    component.registerForm.controls['password'].setValue('1234');
    component.registerForm.controls['lastName'].setValue('prueba');
    component.registerForm.controls['firstName'].setValue('prueba');
    component.registerForm.controls['userName'].setValue('prueba');
    expect(component.registerForm.valid).toBeTruthy();
  }));
});
