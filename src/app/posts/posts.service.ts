import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<{posts: Post[], postCount: number}>();

  private uri = 'http://localhost:3434/api/posts';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  // GET all with query params
  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http.get<{message: string, posts: any, maxPosts: number}>(`${this.uri}` + queryParams)
    .pipe(
      catchError(this.handleError)
    )
    .pipe(map(
      (postData) => {
        return {
          posts: postData.posts.map(
            (post) => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
              };
            }
          ),
          maxPosts: postData.maxPosts,
        };
      }
    ))
    .subscribe(
      (transformedPostData) => {
        this.posts = transformedPostData.posts;
        this.postUpdated.next(
          {
            posts: [...this.posts],
            postCount: transformedPostData.maxPosts,
          }
        );
      }
    );
  }

  getPostUpdatedListener() {
    return this.postUpdated.asObservable();
  }

  // GET by ID
  getPost(id: string) {
    return this.http.get<{
      _id: string,
      title: string,
      content: string,
      imagePath: string}>(`${this.uri}/edit/${id}`);
  }

  // POST
  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    this.http.post<{message: string, post: Post}>(`${this.uri}/add`, postData)
    .pipe(
      catchError(this.handleError)
    )
    .subscribe(
      (responsePost) => {
        this.router.navigate(['/']);
      }
    );
  }

  // UPDATE
  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: FormData | Post;
    if (typeof(image) === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
      };
    }
    this.http.put(`${this.uri}/update/${id}`, postData)
      .pipe(catchError(this.handleError))
      .subscribe(
        (response) => {
          this.router.navigate(['/']);
        });
  }

  // DELETE
  deletePost(postId: string) {
    return this.http.get(`${this.uri}/delete/${postId}`);
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
