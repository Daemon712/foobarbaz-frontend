import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {AccessOption, Challenge, ChallengeDetails} from "../../../model/challenge";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-challenge-edit',
  templateUrl: 'challenge-edit.component.html',
})
export class ChallengeEditComponent {
  form: FormGroup;
  challenge: Challenge = new Challenge();
  accessOption = AccessOption;

  @ViewChild("modal")
  modal: ModalDirective;

  @Input()
  initData: Challenge;

  @Output()
  onSubmit = new EventEmitter<Challenge>();

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50)
      ])],
      shortDescription: ['', Validators.compose([
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(300)
      ])],
      fullDescription: ['', Validators.compose([
        Validators.required,
        Validators.minLength(100),
        Validators.maxLength(5000)
      ])],
    });
  }

  //noinspection JSUnusedGlobalSymbols
  open(){
    Object.assign(this.challenge, this.initData);
    this.challenge.details = Object.assign(new ChallengeDetails(), this.initData.details);
    this.form.setValue({
      name: this.challenge.name,
      shortDescription: this.challenge.shortDescription,
      fullDescription: this.challenge.details.fullDescription,
    });
    this.modal.show();
  }

  submit(){
    Object.assign(this.challenge, this.form.value);
    Object.assign(this.challenge.details, this.form.value);
    this.onSubmit.emit(this.challenge);
    this.modal.hide();
  }

  close(){
    this.form.reset();
    this.modal.hide();
  }

  displayErrors(control: string){
    return this.form.controls[control].errors &&
      (this.form.controls[control].dirty || this.form.controls[control].touched);
  }

  displayError(control: string, error: string){
    return this.form.controls[control].errors[error];
  }
}
