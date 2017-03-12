import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Comment} from '../../model/comment';

@Component({
  selector: 'app-comments',
  templateUrl: 'comments.component.html',
  styleUrls: ['comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input()
  comments: Comment[];

  @Output()
  commentLiked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  like(comment: Comment){
    this.commentLiked.emit(comment);
  }
}
