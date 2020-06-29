import {async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';

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
import { RegistrarUsuarioComponent } from '../registrar-usuario/registrar-usuario.component';
import { CrearPublicacionComponent } from '../crear-publicacion/crear-publicacion.component';
import { EditarInformacionModalComponent } from '../editar-informacion-modal/editar-informacion-modal.component';
import { PublicacionComponent } from '../publicacion/publicacion.component';
import { RecuperarPasswordComponent } from '../recuperar-password/recuperar-password.component';
import { UsersListComponent } from '../users-list/users-list.component';
import { By } from '@angular/platform-browser';


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
        PublicacionComponent,
        EditarInformacionModalComponent,
        RecuperarPasswordComponent,
        UsersListComponent
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


     //prueba que boton de submit este habilitado cuando form lleno
     it('should call the onSubmit method', fakeAsync(() => {
      component.registerForm.controls['email'].setValue('prueba@prueba.com');
      component.registerForm.controls['password'].setValue('1234');
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
      expect(component.registerForm.valid).toBeFalsy();
    }));

    // prueba que form llenado sea valido
    it('form should be valid', async(() => {
      component.registerForm.controls['email'].setValue('prueba@prueba.com');
      component.registerForm.controls['password'].setValue('1234');
      expect(component.registerForm.valid).toBeTruthy();
    }));
});
