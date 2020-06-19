import {Injectable, EventEmitter} from '@angular/core';
import {UserData} from './models';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {FormGroup} from '@angular/forms';

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

  setUserDataOnFirebase(uid: string, form: FormGroup, imgUrl: string, userInfo: UserData) {
    const firebaseUserId = uid;
    if (imgUrl === null) {
      imgUrl =
        'https://firebasestorage.googleapis.com/v0/b/proyectoazul-dc9d3.appspot.com/o/profile.png?alt=media&token=16c015bd-241e-43db-a53f-b5a4169f9d0f';
    }
    let newPostEntry;
    if(userInfo){
      if(!userInfo.followers){
        userInfo.followers = null;
      }
      if(!userInfo.following){
        userInfo.following = null;
      }
      newPostEntry = {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        userName: form.value.userName,
        created: new Date().getTime(),
        lastUpdate: new Date().getTime(),
        img: imgUrl,
        fullName: form.value.firstName + ' ' + form.value.lastName,
        userId: uid,
        followers: userInfo.followers,
        following: userInfo.following
      };
    }else{
    newPostEntry = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      userName: form.value.userName,
      created: new Date().getTime(),
      lastUpdate: new Date().getTime(),
      img: imgUrl,
      fullName: form.value.firstName + ' ' + form.value.lastName,
      userId: uid
    };
  }

    const updates = {};
    updates[`users/${firebaseUserId}`] = newPostEntry;

    this.firebaseDatabase.database.ref().update(updates);
  }
}
