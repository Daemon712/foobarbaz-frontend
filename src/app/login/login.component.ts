import { Component, OnInit } from '@angular/core';
import {UserCredentials} from "../model/user-credentials";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";

@Component({
  // moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model = new UserCredentials();
  submitted = false;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
  }
}


