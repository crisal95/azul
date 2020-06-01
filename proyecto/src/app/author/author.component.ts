import {Component, OnInit} from '@angular/core';
import {PostData} from '../shared/models';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../shared/post.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  private authorName = null;
  private posts: PostData[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.activatedRoute.snapshot.queryParamMap.get('authorName');


      this.authorName = this.activatedRoute.snapshot.queryParamMap.get('authorName');

      // this.posts = this.postService.getPostsByAuthor(this.authorName);

  }
}
