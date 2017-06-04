import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Comment} from '../../model/comment';
import {UserService} from "../../service/user.service";
import {User, UserRole} from "../../model/user";

@Component({
  selector: 'app-comments',
  templateUrl: 'comments.component.html',
})
export class CommentsComponent implements OnInit {

  @Input()
  comments: Comment[];

  @Output() commentLiked = new EventEmitter<Comment>();
  @Output() commentUpdated = new EventEmitter<Comment>();
  @Output() commentDeleted = new EventEmitter<Comment>();

  user: User;

  constructor (
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.user = this.userService.user;
  }

  canEdit(comment: Comment): boolean{
    return this.user && (this.user.username == comment.author.username
      || this.user.role > UserRole.USER);
  }

  updateComment(comment: Comment){
    this.commentUpdated.emit(comment);
  }

  deleteComment(comment: Comment){
    return () => this.commentDeleted.emit(comment);
  }

  like(comment: Comment){
    this.commentLiked.emit(comment);
  }
}
