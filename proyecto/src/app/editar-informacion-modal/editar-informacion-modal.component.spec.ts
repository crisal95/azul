import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInformacionModalComponent } from './editar-informacion-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireStorage} from '@angular/fire/storage';

describe('EditarInformacionModalComponent', () => {
  let component: EditarInformacionModalComponent;
  let fixture: ComponentFixture<EditarInformacionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,
      ReactiveFormsModule
      //AngularFireModule.initializeApp(environment.firebaseConfig),
      //AngularFireAuthModule,
      //AngularFireDatabaseModule,
      //AngularFireStorageModule
    ],
      declarations: [ EditarInformacionModalComponent ],
      providers: [
        {provide: AngularFireAuth, useValue: mockAngularFireAuth},
        {provide: AngularFireStorage, useValue: null}
      ]
    })
    .compileComponents();
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
