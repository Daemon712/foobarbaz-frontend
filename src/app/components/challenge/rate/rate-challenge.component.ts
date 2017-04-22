import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";

@Component({
  selector: 'app-rate-challenge',
  templateUrl: './rate-challenge.component.html',
})
export class RateChallengeComponent implements OnInit {

  rating: number;
  difficulty: number;

  @ViewChild('ratingModal')
  ratingModal: ModalDirective;

  @Input()
  initRating: number;
  @Input()
  initDifficulty: number;

  @Output()
  onSubmit = new EventEmitter<{rating: number, difficulty: number}>();

  constructor() { }

  ngOnInit() {
    this.rating = this.initRating;
    this.difficulty = this.initDifficulty;
  }

  submit(){
    this.onSubmit.emit({rating: this.rating, difficulty: this.difficulty});
    this.ratingModal.hide();
  }

  close(){
    this.rating = this.initRating;
    this.difficulty = this.initDifficulty;
    this.ratingModal.hide();
  }
}
