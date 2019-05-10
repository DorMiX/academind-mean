import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  private uri = 'http://localhost:3434/api/posts';

  constructor(
    private http: HttpClient,
  ) {}

  getPosts() {
    // return [...this.posts];
    this.http.get<{message: string, posts: any}>(`${this.uri}`)
    .pipe(map(
      (postData) => {
        return postData.posts.map(
          (post) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
            };
          }
        )
      }
    ))
    .subscribe(
      (transformedPost) => {
        this.posts = transformedPost;
        this.postUpdated.next([...this.posts]);
      }
    );
  }

  getPostUpdatedListener() {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post  = {id: null, title: title, content: content};
    this.http.post<{message: string}>(`${this.uri}`, post).subscribe(
      (responseData) => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      }
    );
  }

  deletePost(postId: string) {
    console.log("service:" + postId);
    this.http.delete(`${this.uri}/${postId}`)
      .subscribe(
        () => {
          console.log("Deleted!")
        }
      );
  }
}
