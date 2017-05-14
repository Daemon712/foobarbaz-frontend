import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Comment} from '../../model/comment';
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-comments',
  templateUrl: 'comments.component.html',
})
export class CommentsComponent implements OnInit {

  @Input()
  comments: Comment[];

  @Output()
  commentLiked = new EventEmitter();

  user: User;

  constructor (
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.user = this.userService.user;
  }

  like(comment: Comment){
    this.commentLiked.emit(comment);
  }
}
