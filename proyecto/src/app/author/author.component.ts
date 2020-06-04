import {Component, OnInit} from '@angular/core';
import {PostData, UserData} from '../shared/models';
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
  private posts: PostData[];
  public user: UserData;
  public visitor;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private firebaseDatabase: AngularFireDatabase,
    private firebaseAuth: AngularFireAuth
  ) {

    if (this.user == null) {
      this.user = {
        created: null,
        lastUpdate: null,
        email: null,
        userName: null,
        fullName: null,
        img: null
      };
      }
  }

  ngOnInit() {
    this.visitor = this.activatedRoute.snapshot.queryParamMap.get('userId');
    if (this.visitor) {
      this.userId = this.visitor;
      this.firebaseDatabase
        .object(`users/${this.userId}`)
        .valueChanges()
        .subscribe(user => {
          this.user = user as UserData;
        });
      //this.getPosts();
    } else {
      this.firebaseAuth.currentUser.then(userData => {
        // console.log('userData en el componente', userData);
        if (!!userData && 'uid' in userData && !!userData.uid) {
          this.userId = userData.uid;
          console.log(userData.uid);
        }

        this.firebaseDatabase
          .object(`users/${this.userId}`)
          .valueChanges()
          .subscribe(user => {
            this.user = user as UserData;
          });
        this.getPosts();
      });
    }
  }

  getPosts() {}
}
