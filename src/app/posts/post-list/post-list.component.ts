import { Component, OnInit, Input } from '@angular/core';

import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  // posts = [
  //   {title: 'Post 1', content: 'This is the Post 1.'},
  //   {title: 'Post 2', content: 'This is the Post 2.'},
  //   {title: 'Post 3', content: 'This is the Post 3.'},
  // ];
  @Input() posts: Post[] = [];
  constructor() { }

  ngOnInit() {
  }

}
