import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  @Output() sentPost = new EventEmitter<Post>();

  constructor(
    private postsService: PostsService,
  ) { }

  ngOnInit() {
  }

  onAddPost(form: NgForm) {
    if(form.invalid) {
      return;
    }
    const post: Post = {
      title: form.value.title,
      content: form.value.content,
    }
    this.sentPost.emit(post);
  }

}
