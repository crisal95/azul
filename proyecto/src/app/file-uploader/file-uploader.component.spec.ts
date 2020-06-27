import {async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';

import {FileUploaderComponent} from './file-uploader.component';

import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { By } from  '@angular/platform-browser';

describe('FileUploaderComponent', () => {
  let component: FileUploaderComponent;
  let fixture: ComponentFixture<FileUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploaderComponent],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AngularFireStorageModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


     //prueba que boton de seleccionar imagen
     it('should call the onUploadImage method', fakeAsync(() => {
      spyOn(component, 'onUploadImage');

      let button2 = fixture.debugElement.query(By.css('#boton'));
      button2.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.onUploadImage).toHaveBeenCalledTimes(1);
      });
    }));
});
