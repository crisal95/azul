import {Component, OnInit} from '@angular/core';
import {PostData} from '../shared/models';
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
  public posts: PostData[] = [];
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
  ) {}

  ngOnInit() {
    // this.posts = this.postService.getAllPosts();
    // console.log(this.posts);

    this.firebaseAuth.currentUser.then(userData => {
      // console.log('userData en el componente', userData);
      if (!!userData && 'uid' in userData && !!userData.uid) {
        this.author = userData.uid;
        //console.log(userData.uid);

        this.firebaseDatabase
          .list(`posts/${this.author}`, ref => ref.limitToLast(100).orderByChild('created'))
          .snapshotChanges()
          .subscribe(data => {
            //console.log(data);
            this.posts = data.map(e => {
              return {
                ...(e.payload.val() as PostData)
              };
            });
            //console.log(this.posts);
          });
      }
    });

    // this.author = firebase.auth().currentUser.uid;

    // Creo una referencia a la coleccion de "posts" en la base de datos
    // con ciertas reglas de cantidad y filtrado
    // this.postsRef = firebase
    //   .database()
    //   .ref('posts')
    //   .child(this.author)
    //   .limitToLast(100)
    //   .orderByChild('created');

    // Este evento se ejecuta cada vez que la aplicacion abre por primera vez (incluyendo un refresh)
    // o cuando se agrega un elemento a la coleccion posts/id_del_usuario en firebase
    // this.postsRef.on('child_added', data => {
    //   console.log(data.val());
    //   console.log(data.key);

    //   const newPost: PostData = data.val();
    //   newPost.key = data.key;
    //   this.posts.push(newPost);
    // });
  }

  onSubmit(form: NgForm) {

  }

  onImagePicked(imageUrl: string) {
    this.uploadedFileUrl = imageUrl;
  }
}
