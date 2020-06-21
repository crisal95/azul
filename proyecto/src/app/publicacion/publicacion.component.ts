import {Component, OnInit, Input} from '@angular/core';
import {UserData, PostData} from '../shared/models';
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

  constructor(private postService: PostService) {}

  ngOnInit() {}

  delete(userId: string, key: string) {
    this.postService.deletePost(userId, key);
  }
}
