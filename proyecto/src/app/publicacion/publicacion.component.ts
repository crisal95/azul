import {Component, OnInit, Input} from '@angular/core';
import {UserData, PostData} from '../shared/models';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {NotificationService} from '../shared/notification.service';
import {SpinnerService} from '../shared/spinner.service';
import {PostService} from '../shared/post.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {
  @Input() userData: UserData;
  @Input() postData: PostData;
  @Input() userLoggedInId: string;

  public userLikeThisPost: boolean;
  public usersReactionIds: Array<string> = [];

  constructor(
    private firebaseDatabase: AngularFireDatabase,
    private firebaseAuth: AngularFireAuth,
    private notificationService: NotificationService,
    private spinnerService: SpinnerService,
    private postService: PostService
  ) {
    this.userLikeThisPost = false;
    this.getReactions();
  }

  ngOnInit() {
    this.userLikedThisPost();
    this.getReactions();
  }

  likePost() {
    this.firebaseAuth.currentUser
      .then(userData => {
        const actualUserId = userData.uid;
        const postUserId = this.userData.userId;
        const postId = this.postData.key;
        const updates = {};

        updates[`posts/${postUserId}/${postId}/likes/${actualUserId}`] = actualUserId;
        console.log(updates);
        this.firebaseDatabase.database.ref().update(updates);

        this.notificationService.showSuccessMessage('Great!', 'Post liked.');
        this.spinnerService.hideMainSpinner();
      })
      .catch(error => {
        this.notificationService.showErrorMessage('Error!!!', 'Cant like this post.');
        this.spinnerService.hideMainSpinner();
      });
    this.userLikedThisPost();
    this.getReactions();
  }

  userLikedThisPost() {
    this.firebaseAuth.currentUser
      .then(userData => {
        const actualUserId = userData.uid;
        const postUserId = this.userData.userId;
        const postId = this.postData.key;

        this.firebaseDatabase.database
          .ref(`posts/${postUserId}/${postId}/likes/${actualUserId}`)
          .on('value', snapshot => {
            if (snapshot.exists()) {
              this.userLikeThisPost = true;
            } else {
              this.userLikeThisPost = false;
            }
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  unlikePost() {
    this.firebaseAuth.currentUser
      .then(userData => {
        const actualUserId = userData.uid;
        const postUserId = this.userData.userId;
        const postId = this.postData.key;

        const refActualPost = this.firebaseDatabase.database.ref(
          `posts/${postUserId}/${postId}/likes/${actualUserId}`
        );

        refActualPost
          .remove()
          .then(function() {
            console.log('Unlike succeeded.');
          })
          .catch(function(error) {
            console.log('Unlike failed: ' + error.message);
          });

        this.notificationService.showSuccessMessage('Great!', 'Post unliked.');
        this.spinnerService.hideMainSpinner();
      })
      .catch(error => {
        this.notificationService.showErrorMessage('Error!!!', 'Cant unlike this post.');
        this.spinnerService.hideMainSpinner();
      });
    this.userLikedThisPost();
    this.getReactions();
  }

  getReactions() {
    this.firebaseAuth.currentUser.then(userData => {
      const postUserId = this.userData.userId;
      const postId = this.postData.key;
      this.firebaseDatabase
        .list(`posts/${postUserId}/${postId}/likes`)
        .snapshotChanges()
        .subscribe(data => {
          this.usersReactionIds = data.map(e => {
            return e.payload.val() as string;
          });
        });
    });


  delete(userId: string, key: string) {
    this.postService.deletePost(userId, key);
  }
}
