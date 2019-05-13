import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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
        console.log(postData.message);
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
    this.http.post<{message: string}>(`${this.uri}/add`, post).subscribe(
      (responseData) => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      }
    );
  }

  deletePost(postId: string) {
    console.log("service:" + postId);
    return this.http.get(`${this.uri}/delete/${postId}`)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(
        () => {
          console.log("Deleted!")
        }
      );
  }

  private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
};
}
