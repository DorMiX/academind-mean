import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSubscription: Subscription;
  constructor(
    private postsService: PostsService,
  ) { }

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSubscription = this.postsService.getPostUpdatedListener().subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);

  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

}
