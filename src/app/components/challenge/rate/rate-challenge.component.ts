import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {Rating} from "../../../model/rating";

@Component({
  selector: 'app-rate-challenge',
  templateUrl: './rate-challenge.component.html',
})
export class RateChallengeComponent implements OnInit {

  rating: Rating;

  @ViewChild('ratingModal')
  ratingModal: ModalDirective;

  @Input()
  initRating: Rating;

  @Output()
  onSubmit = new EventEmitter<Rating>();

  constructor() { }

  ngOnInit() {
    this.rating = new Rating();
    Object.assign(this.rating, this.initRating);
  }

  //noinspection JSUnusedGlobalSymbols
  open(){
    this.ratingModal.show();
  }

  submit(){
    this.onSubmit.emit(this.rating);
    this.ratingModal.hide();
  }

  close(){
    Object.assign(this.rating, this.initRating);
    this.ratingModal.hide();
  }
}
