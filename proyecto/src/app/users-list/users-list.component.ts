import {Component, OnInit, Input} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserData} from '../shared/models';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  @Input() listType: String;
  @Input() userId: String;

  public users: UserData[] = [];
  public modalId: String;

  constructor(
    private firebaseDatabase: AngularFireDatabase,
    private firebaseAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    if (this.userId && this.listType) {
      this.getUsers(this.userId, this.listType.toLowerCase());
    }
  }

  getUsers(userId: String, mode: String) {
    switch (mode) {
      case 'following':
        this.firebaseAuth.currentUser.then(userData => {
          this.firebaseDatabase
            .list(`users/${userId}/following`)
            .snapshotChanges()
            .subscribe(data => {
              console.log(data);
              this.users = data.map(e => {
                return {
                  ...(e.payload.val() as UserData)
                };
              });
            });
        });
        break;
      case 'followers':
        break;
      default:
        break;
    }
  }
}
