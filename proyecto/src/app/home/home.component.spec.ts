import {async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {routes} from '../app-routing.module';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthorComponent} from '../author/author.component';
import {LoginComponent} from '../login/login.component';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {FileUploaderComponent} from '../file-uploader/file-uploader.component';
import {ToastrModule} from 'ngx-toastr';

import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {SpinnerService} from '../shared/spinner.service';
import { RegistrarUsuarioComponent } from '../registrar-usuario/registrar-usuario.component';


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
      declarations: [HomeComponent, AuthorComponent, LoginComponent, FileUploaderComponent, RegistrarUsuarioComponent],
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

    spinnerService = fixture.debugElement.injector.get(SpinnerService);
    spinnerSpy = spyOn(spinnerService, 'showMainSpinner'); //.and.returnValue()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', fakeAsync(() => {
    component.ngOnInit();
    tick(100);
    expect(component.posts).toBeTruthy();
    // console.log('component.author: ', component.author);
    expect(component.author).toBeTruthy();
    expect(component.author.length).toBeGreaterThan(0);
    expect(component.author).not.toBe('');
  }));

  it('should upload', () => {
    const dummyUrl = 'patito patito color de cafe';
    component.onImagePicked(dummyUrl);
    expect(component.uploadedFileUrl).toBe(dummyUrl);
  });

  it('should submit form', () => {
    const testForm = {
      reset() {},
      value: {
        title: 'blah',
        content: 'lorem ipsum'
      }
    } as NgForm;

    const resetSpy: jasmine.Spy = spyOn(testForm, 'reset');

    component.onSubmit(testForm);
    expect(spinnerSpy).toHaveBeenCalled();
    expect(spinnerSpy.calls.all().length).toEqual(1);

    expect(resetSpy).toHaveBeenCalled();
    expect(resetSpy.calls.all().length).toEqual(1);
  });
});
