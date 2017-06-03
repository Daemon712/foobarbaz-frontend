import {Component, OnInit, ViewChild} from '@angular/core';
import {Challenge, ChallengeStatus} from "../../../model/challenge";
import {SharedSolution} from "../../../model/shared-solution";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AceEditorComponent} from "ng2-ace-editor";
import {SharedSolutionService} from "../../../service/shared-solution.service";
import {Comment} from "../../../model/comment";
import {SolutionCommentService} from "../../../service/comment.service";
import {UserService} from "../../../service/user.service";
import {User, UserRole} from "../../../model/user";

@Component({
  selector: 'app-shared-solution-view',
  templateUrl: './shared-solution-view.component.html',
  styleUrls: ['./shared-solution-view.component.scss']
})
export class SharedSolutionViewComponent implements OnInit {

  @ViewChild(AceEditorComponent)
  solutionView: AceEditorComponent;

  challenge: Challenge;
  solution: SharedSolution;
  challengeStatus = ChallengeStatus;

  modify: string;
  currentUser: User;
  newComment: string;
  comments: Comment[];
  submitted: string;

  options = {
    printMargin: false,
    fontSize: '16px',
    highlightActiveLine: false,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedSolutionService: SharedSolutionService,
    private commentService: SolutionCommentService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.currentUser = this.userService.user;
    this.activatedRoute.params
      .switchMap((params: Params) => this.sharedSolutionService.getSharedSolution(+params['id']))
      .subscribe((solution: SharedSolution) => {
        if (!solution) return;
        this.solution = solution;
        this.challenge = solution.challenge;
        this.solutionView.setText(solution.implementation);
        this.solutionView.getEditor().clearSelection();
        this.loadComments();
      });
  }

  get canEdit(){
    return this.currentUser && (this.currentUser.username == this.solution.author.username
      || this.currentUser.role > UserRole.USER);
  }

  like(){
    this.submitted = 'like';
    this.solution.liked = !this.solution.liked;
    this.sharedSolutionService.likeSharedSolution(this.solution.id, this.solution.liked)
      .then(rating => {
        this.submitted = null;
        this.solution.rating = rating
      });
  }

  updateSolution(){
    this.submitted = 'edit';
    this.sharedSolutionService.updateSharedSolution(this.solution.id, this.modify)
      .then(value => {
        this.submitted = null;
        this.modify = null;
        this.solution.comment = value.comment;
      });
  }

  deleteSolution(){
    this.submitted = 'delete';
    this.sharedSolutionService.deleteSharedSolution(this.solution.id)
      .then(() => this.router.navigate(['/challenges', this.challenge.id]));
  }

  sendComment(){
    this.commentService.addComment(this.solution.id, this.newComment)
      .then(comment => this.comments.push(comment));
    this.newComment = null;
  }

  loadComments(){
    this.commentService.getComments(this.solution.id)
      .then(comments => this.comments = comments);
  }

  commentLiked(comment: Comment){
    comment.liked = !comment.liked;
    comment.rating += comment.liked ? +1 : -1;
    this.commentService.likeComment(comment.id, comment.liked)
      .then(likes => {
        comment.rating = likes;
      });
  }
}
