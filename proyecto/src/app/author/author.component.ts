import {Component, OnInit} from '@angular/core';
import {PostData, UserData} from '../shared/models';
import {PostService} from '../shared/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  private userId = null;
  public posts: PostData[] = [];
  public userExist: boolean;
  public user: UserData;
  public visitor: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private firebaseDatabase: AngularFireDatabase,
    private firebaseAuth: AngularFireAuth,
    private postService: PostService
  ) {

    this.userExist = true;
  }

  ngOnInit() {
    this.visitor = this.activatedRoute.snapshot.queryParamMap.get('userId');
    if (this.visitor) {
      this.userId = this.visitor;
      this.firebaseDatabase
        .object(`users/${this.userId}`)
        .valueChanges()
        .subscribe(user => {
          if (user !== null) {
            this.user = user as UserData;
            this.getPosts(this.userId);
          } else {
            // console.log('User dont exist.');
            this.userExist = false;
          }
        });
    } else {
      this.firebaseAuth.currentUser.then(userData => {
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
      });
    }
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
}
