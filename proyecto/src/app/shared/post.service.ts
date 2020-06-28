import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {PostData} from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: PostData[];

  constructor(
    private firebaseDatabase: AngularFireDatabase,
    private firebaseAuth: AngularFireAuth
  ) {}

  getAllPosts() {
    // return this.posts;
  }

  // addNewPost(title: string, content: string) {
  //   const newKey = this.posts.length + 1;

  //   const newPost: PostData = {
  //     author: 'test123',
  //     content: content,
  //     creationDate: new Date().toString(),
  //     title: title,
  //     key: newKey.toString(10),
  //     img: 'https://placeimg.com/320/240/any/sepia'
  //   };

  //   this.posts.push(newPost);
  // }

  addNewPostAsync(content: string, imgUrl: string) {
    return this.firebaseAuth.currentUser.then(userData => {
      const firebaseUserId = userData.uid;
      const newPostKey = this.firebaseDatabase.database
        .ref()
        .child(`posts/${firebaseUserId}`)
        .push().key;

      const newPostEntry = {
        content: content,
        created: new Date().getTime(),
        creationDate: new Date().toString(),
        img: imgUrl,
        userId: firebaseUserId,
        key: newPostKey
      };

      const updates = {};
      updates[`posts/${firebaseUserId}/${newPostKey}`] = newPostEntry;

      return this.firebaseDatabase.database.ref().update(updates);
    });
  }

  getPostsByAuthor(author: string) {
    return this.firebaseDatabase
      .list(`posts/${author}`, ref => ref.limitToLast(100).orderByChild('created'))
      .snapshotChanges();
  }

  deletePost(userId: string, postKey: string) {
    this.firebaseDatabase.database.ref('/posts/' + userId + '/' + postKey + '/').remove();
  }
}
