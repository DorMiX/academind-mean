import { Component, OnInit, Input } from '@angular/core';

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
  @Input() posts = [];
  constructor() { }

  ngOnInit() {
  }

}
