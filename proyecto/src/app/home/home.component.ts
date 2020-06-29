import {Component, OnInit} from '@angular/core';
import {PostData, UserData} from '../shared/models';
import {PostService} from '../shared/post.service';
import {NotificationService} from '../shared/notification.service';
import {NgForm} from '@angular/forms';
import {SpinnerService} from '../shared/spinner.service';
import {UserService} from '../shared/user.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  // Most important variables
  public posts: PostData[] = [];
  public usersData: UserData[] = [];
  // Other variables
  private postsBuffer: PostData[] = [];
  public userData: UserData;
  public userId: string;
  public usersFollowing: string[] = [];

  postsRef: any;
  author = '';
  uploadedFileUrl = '';

  constructor(
    private postService: PostService,
    private notificationServie: NotificationService,
    private spinnerService: SpinnerService,
    private userService: UserService,
    private firebaseDatabase: AngularFireDatabase,
    private firebaseAuth: AngularFireAuth
  ) {
    this.posts = [];
  }

  ngOnInit() {
    // Gets user session info
    this.firebaseAuth.currentUser
      .then(authData => {
        this.userId = authData.uid;
        this.author = authData.uid;

        // Gets user data and posts
        this.firebaseDatabase
          .object(`users/${this.userId}`)
          .valueChanges()
          .subscribe(user => {
            if (user !== null) {
              this.userData = user as UserData;
              this.getHomePosts(this.userData);
            }
          });
      })
      .catch(error => {
        console.log(error);
      });
  }


  onImagePicked(imageUrl: string) {
    this.uploadedFileUrl = imageUrl;
  }

  getHomePosts(user: UserData) {
    this.posts = [];
    this.usersData = [];

    this.firebaseAuth.currentUser.then(userData => {
      const userId = userData.uid;
      // Adds itself to the following lists
      Object.assign(user.following, {[userId]: userId});
      const followingUsers = Object.keys(user.following).length;

      // Gets following users data
      for (let index = 0; index < followingUsers; index++) {
        this.userService
          .getUserDataFromFirebase(Object.keys(user.following)[index].toString())
          .then(result => {
            if (result.exists()) {
              let bufferUserData: UserData = result.val();
              bufferUserData.userId = Object.keys(user.following)[index].toString();
              this.usersData.push(bufferUserData);
            }
          });

        console.log('this.usersData', this.usersData);
      }

      // Gets following users posts
      for (let index = 0; index < followingUsers; index++) {
        this.postsBuffer = [];
        this.firebaseDatabase
          .list(`posts/${Object.keys(user.following)[index]}`, ref =>
            ref.limitToLast(10).orderByChild('created')
          )
          .snapshotChanges()
          .subscribe(data => {
            this.postsBuffer = data.map(e => {
              return {
                ...(e.payload.val() as PostData)
              };
            });

            let matchIndex = this.posts.findIndex(
              x => x.userId === Object.keys(user.following)[index]
            );
            while (matchIndex !== -1) {
              this.posts.splice(matchIndex, 1);
              matchIndex = this.posts.findIndex(
                x => x.userId === Object.keys(user.following)[index]
              );
            }

            this.posts = this.posts.concat(this.postsBuffer);

            if (index === followingUsers - 1) {
              this.posts.sort(function(a, b) {
                return a.created - b.created;
              });
              this.posts.sort((a, b) => a.created - b.created);
              this.posts.reverse();
            }
          });
      }
    });
  }

  getUserObjectFromPost(post: PostData) {
    return this.usersData.find(x => x.userId == post.userId);
  }
}
