import {Component, OnInit} from '@angular/core';
import {PostData, UserData} from '../shared/models';
import {PostService} from '../shared/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {NotificationService} from '../shared/notification.service';
import {SpinnerService} from '../shared/spinner.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  private userId = null;
  public posts: PostData[] = [];
  public userExist: boolean;
  public userConsultingHisPersonalProfile: boolean;
  public userIsFollowingVisitedProfile: boolean;
  public user: UserData;
  public visitor: string;
  public actualUser: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private firebaseDatabase: AngularFireDatabase,
    private firebaseAuth: AngularFireAuth,
    private postService: PostService,
    private notificationService: NotificationService,
    private spinnerService: SpinnerService
  ) {
    this.userExist = true;
    this.userConsultingHisPersonalProfile = true;
    this.userIsFollowingVisitedProfile = false;
  }

  ngOnInit() {
    this.visitor = this.activatedRoute.snapshot.queryParamMap.get('userId');

    this.firebaseAuth.currentUser
      .then(authData => {
        this.actualUser = authData.uid;
      })
      .catch(error => {
        console.log(error);
      });

    if (this.visitor) {
      this.userId = this.visitor;
      this.firebaseDatabase
        .object(`users/${this.userId}`)
        .valueChanges()
        .subscribe(user => {
          if (user !== null) {
            this.user = user as UserData;
            this.getPosts(this.userId);
            if (this.userId !== this.actualUser) {
              this.userConsultingHisPersonalProfile = false;
            }
          } else {
            // console.log('User dont exist.');
            this.userExist = false;
          }
        });
    } else {
      this.firebaseAuth.currentUser
        .then(userData => {
          // console.log('userData en el componente', userData);
          if (!!userData && 'uid' in userData && !!userData.uid) {
            this.userId = userData.uid;
          }
          this.firebaseDatabase
            .object(`users/${this.userId}`)
            .valueChanges()
            .subscribe(user => {
              this.user = user as UserData;
              this.getPosts(this.userId);
            });
        })
        .catch(error => {
          console.log(error);
        });
    }

    this.userIsFollowingThisUser();
  }

  getPosts(userId: string) {
    this.firebaseAuth.currentUser.then(userData => {
      // console.log('userData en el componente', userData);
      this.firebaseDatabase
        .list(`posts/${userId}`, ref => ref.limitToLast(100).orderByChild('created'))
        .snapshotChanges()
        .subscribe(data => {
          //console.log(data);
          this.posts = data.map(e => {
            return {
              ...(e.payload.val() as PostData)
            };
          });
        });
    });
  }

  followUser() {
    this.firebaseAuth.currentUser
      .then(userData => {
        const actualUserId = userData.uid;
        const userToFollowId = this.visitor;
        const updates = {};

        updates[`users/${actualUserId}/following/${userToFollowId}`] = userToFollowId;
        this.firebaseDatabase.database.ref().update(updates);

        this.notificationService.showSuccessMessage('Great!', 'User followed.');
        this.spinnerService.hideMainSpinner();
      })
      .catch(error => {
        this.notificationService.showErrorMessage('Error!!!', 'Cant follow this user.');
        this.spinnerService.hideMainSpinner();
      });
    this.userIsFollowingThisUser();
  }

  userIsFollowingThisUser() {
    this.firebaseAuth.currentUser
      .then(userData => {
        const visitedProfileId = this.visitor;
        const actualUserId = userData.uid;

        this.firebaseDatabase.database
          .ref(`users/${actualUserId}/following/${visitedProfileId}`)
          .on('value', snapshot => {
            if (snapshot.exists()) {
              this.userIsFollowingVisitedProfile = true;
            }
          });
      })
      .catch(error => {
        console.log(error);
      });
  }
}
