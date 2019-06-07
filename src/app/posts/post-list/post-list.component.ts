import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  isAuthenticated = false;
  private postsSubscription: Subscription;
  private authStatusListenerSubs: Subscription;

  constructor(
    private postsService: PostsService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSubscription = this.postsService.getPostUpdatedListener().subscribe(
      (postData: {posts: Post[], postCount: number}) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      }
    );
    this.isAuthenticated = this.authService.getIsAuth();
    this. authStatusListenerSubs = this.authService.getAuthStatusListener().subscribe(
      (isAuth) => {
        this.isAuthenticated = isAuth;
      }
    );
    console.log(this.isAuthenticated);
  }

  onChangedPage(pageData: PageEvent) {
    console.log(pageData);
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(
      () => {
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
      }
    );

  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
    this.authStatusListenerSubs.unsubscribe();
  }

}
