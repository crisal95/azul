import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserData} from '../shared/models';
import {UserService} from '../shared/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnChanges {
  @Input() listType: string;
  @Input() userId: string;

  public users: UserData[] = [];
  public usersIds: string[] = [];
  public modalId: string;

  constructor(
    private firebaseDatabase: AngularFireDatabase,
    private firebaseAuth: AngularFireAuth,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.users = [];
    this.usersIds = [];

    if (this.userId && this.listType) {
      this.getUsers(this.userId, this.listType.toLowerCase());
    }
  }

  getUsers(userId: string, mode: string) {
    this.firebaseAuth.currentUser.then(userData => {
      // Switch starts
      switch (mode) {
        case 'following':
          this.firebaseDatabase
            .list(`users/${userId}/following`)
            .snapshotChanges()
            .subscribe(data => {
              // Returns an usersIds array
              this.usersIds = data.map(e => {
                return e.payload.val() as string;
              });
              // Load users in array
              this.loadUsers();
            });
          break;
        case 'followers':
          break;
        default:
          break;
      }
      // Switch ends
    });
  }

  loadUsers() {
    for (let index = 0; index < this.usersIds.length; index++) {
      this.userService.getUserDataFromFirebase(this.usersIds[index].toString()).then(result => {
        if (result.exists()) {
          let userData: UserData = result.val();
          userData.userId = this.usersIds[index].toString();
          this.users.push(userData);
        }
      });
    }
  }
}
