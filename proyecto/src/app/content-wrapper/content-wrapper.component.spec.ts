import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {ContentWrapperComponent} from './content-wrapper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {UserData} from '../shared/models';

describe('ContentWrapperComponent', () => {
  let component: ContentWrapperComponent;
  let fixture: ComponentFixture<ContentWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
      FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFireDatabaseModule],
      declarations: [ContentWrapperComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should assign a string value', () => {
    let userData: UserData = {
      userId: '1',
      fullName: 'prueba',
      created: 0,
      lastName: 'prueba',
      firstName: 'prueba',
      userName: 'prueba1',
      lastUpdate: 0,
      email: '',
      img: '',
      followers: null,
      following: null
    };
    component.usersList.push(userData);
    component.inputForm.value.searchInput = "prueba";
    component.onClick();
    expect(component.user.fullName).toBe("prueba");
  });
});
