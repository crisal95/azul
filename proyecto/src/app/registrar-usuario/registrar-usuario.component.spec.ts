import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegistrarUsuarioComponent} from './registrar-usuario.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AppRoutingModule} from '../app-routing.module';
import {HomeComponent} from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { AuthorComponent } from '../author/author.component';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { ToastrModule } from 'ngx-toastr';
import { CrearPublicacionComponent } from '../crear-publicacion/crear-publicacion.component';
import { EditarInformacionModalComponent } from '../editar-informacion-modal/editar-informacion-modal.component';
import { PublicacionComponent } from '../publicacion/publicacion.component';


describe('RegistrarUsuarioComponent', () => {
  let component: RegistrarUsuarioComponent;
  let fixture: ComponentFixture<RegistrarUsuarioComponent>;

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
        EditarInformacionModalComponent
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
});
