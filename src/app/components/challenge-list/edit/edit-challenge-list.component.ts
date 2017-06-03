import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ChallengeList} from "../../../model/challenege-list";
import {ModalDirective} from "ng2-bootstrap";

@Component({
  selector: 'app-edit-challenge-list',
  templateUrl: './edit-challenge-list.component.html',
})
export class EditChallengeListComponent {
  form: FormGroup;
  submitted = false;
  challengeList: ChallengeList = new ChallengeList();

  @ViewChild("modal")
  modal: ModalDirective;

  @Input()
  initData: ChallengeList;

  @Output()
  onSubmit = new EventEmitter<ChallengeList>();

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50)
      ])],
      description: ['', Validators.compose([
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(300)
      ])],
    });
  }

  //noinspection JSUnusedGlobalSymbols
  open(){
    Object.assign(this.challengeList, this.initData);
    this.form.setValue({
      name: this.challengeList.name,
      description: this.challengeList.description,
    });
    this.modal.show();
  }

  submit(){
    this.submitted = true;
    Object.assign(this.challengeList, this.form.value);
    this.onSubmit.emit(this.challengeList);
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
