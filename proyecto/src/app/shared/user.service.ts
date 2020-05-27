import {Injectable, EventEmitter} from '@angular/core';
import {UserData} from './models';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {FormGroup} from '@angular/forms';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLoggedIn = false;
  public statusChange: any = new EventEmitter<any>();

  constructor(
    private firebaseAuth: AngularFireAuth,
    private firebaseDatabase: AngularFireDatabase
  ) {}

  performLogin(uid: string) {
    this.getUserDataFromFirebase(uid).then(result => {
      // console.log(result.val());
      this.isLoggedIn = true;
      const userData: UserData = result.val();

      this.statusChange.emit(userData);
    });
  }

  isUserLoggedIn() {
    return this.isLoggedIn;
  }

  performLogout() {
    this.firebaseAuth.signOut().then(() => {
      this.isLoggedIn = false;
      this.statusChange.emit(null);
    });
  }

  getUserDataFromFirebase(uid: string) {
    return this.firebaseDatabase.database
      .ref('users')
      .child(uid)
      .once('value');
  }

  setUserDataOnFirebase(uid: string, form: FormGroup){
      const firebaseUserId = uid;
      const newPostKey = this.firebaseDatabase.database
        .ref()
        .child(`users/${firebaseUserId}`)
        .push().key;


        const imgUrl = 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png';


      const newPostEntry = {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        userName: form.value.userName,
        created: new Date().getTime(),
        lastUpdate: new Date().getTime(),
        img: imgUrl,
        fullName: form.value.firstName + " " + form.value.lastName
      };

      const updates = {};
      updates[`users/${firebaseUserId}`] = newPostEntry;

      this.firebaseDatabase.database.ref().update(updates);

  }
}


