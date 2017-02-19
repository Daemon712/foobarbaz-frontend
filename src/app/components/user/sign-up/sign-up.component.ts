import { Component } from '@angular/core';
import {NewUser} from "../../../model/new-user";

@Component({
  selector: 'app-signup',
  templateUrl: 'sign-up.component.html',
  styleUrls: ['sign-up.component.css']
})
export class SignUpComponent {
  model = new NewUser();

  constructor() { }

  onSubmit() {

  }
}
