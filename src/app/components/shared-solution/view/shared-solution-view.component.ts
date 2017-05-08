import {Component, OnInit, ViewChild} from '@angular/core';
import {Challenge, ChallengeStatus} from "../../../model/challenge";
import {SharedSolution} from "../../../model/shared-solution";
import {ActivatedRoute, Params} from "@angular/router";
import {AceEditorComponent} from "ng2-ace-editor";
import {SharedSolutionService} from "../../../service/shared-solution.service";
import {Comment} from "../../../model/comment";
import {CommentService} from "../../../service/comment.service";

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

  newComment: string;
  comments: Comment[];

  options = {
    printMargin: false,
    fontSize: '16px',
    highlightActiveLine: false,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedSolutionService: SharedSolutionService,
    private commentService: CommentService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .switchMap((params: Params) => this.sharedSolutionService.getSharedSolution(+params['id']))
      .subscribe((solution: SharedSolution) => {
        this.solution = solution;
        this.challenge = solution.challenge;
        this.solutionView.setText(solution.implementation);
        this.solutionView.getEditor().clearSelection();
        this.loadComments();
      });
  }

  like(){
    this.solution.liked = !this.solution.liked;
    this.solution.rating += this.solution.liked ? +1 : -1;
    this.sharedSolutionService.likeSharedSolution(this.challenge.id, this.solution.sharedSolutionId, this.solution.liked)
      .then(solution => {
        this.solution.liked = solution.liked;
        this.solution.rating = solution.rating;
      });
  }

  sendComment(){
    // this.commentService.addComment(this.newComment, this.solution.challengeId, this.solution.sharedSolutionId)
    //   .then(comment => this.comments.push(comment));
    // this.newComment = null;
  }

  loadComments(){
    // this.commentService.getComments(this.solution.challengeId, this.solution.sharedSolutionId)
    //   .then(comments => this.comments = comments);
  }

  commentLiked(comment: Comment){
    comment.liked = !comment.liked;
    comment.likes += comment.liked ? +1 : -1;
    this.commentService.likeComment(comment.id, comment.liked)
      .then(newComment => {
        comment.liked = newComment.liked;
        comment.likes = newComment.likes;
      });
  }
}
