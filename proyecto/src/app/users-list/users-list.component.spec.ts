import {async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';

import {UsersListComponent} from './users-list.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from 'src/environments/environment';
import {RouterModule, Routes} from '@angular/router';
import {By} from '@angular/platform-browser';
import {UserData} from '../shared/models';
import {AuthorComponent} from '../author/author.component';
import {EditarInformacionModalComponent} from '../editar-informacion-modal/editar-informacion-modal.component';
import {PublicacionComponent} from '../publicacion/publicacion.component';
import {FileUploaderComponent} from '../file-uploader/file-uploader.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
const routes: Routes = [{path: 'author', component: AuthorComponent}];

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        RouterModule,
        RouterModule.forRoot(routes),
        CommonModule,
        ReactiveFormsModule
      ],
      declarations: [
        UsersListComponent,
        AuthorComponent,
        EditarInformacionModalComponent,
        PublicacionComponent,
        FileUploaderComponent,
        EditarInformacionModalComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    component.users.push(userData);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close modal when function closeModal() is called', fakeAsync(() => {
    spyOn(component, 'closeModal');
    let button = fixture.debugElement.query(By.css('#closeModalLink')).nativeElement.click();
    tick(); // simulates the passage of time until all pending asynchronous activities finish
    fixture.detectChanges();
    expect(component.closeModal).toHaveBeenCalled();
  }));
});

let userData: UserData = {
  userId: 'H01iw0h8I9cJvJYZafONCPPmujg1',
  fullName: 'prueba',
  created: 1587425842014,
  lastName: 'prueba',
  firstName: 'prueba',
  userName: 'prueba1',
  lastUpdate: 1587425842014,
  email: '',
  img: '',
  followers: null,
  following: null
};
