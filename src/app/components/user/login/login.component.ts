import { Component, OnInit } from '@angular/core';
import {User} from "../../../model/user";
import {Router} from "@angular/router";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  model = new User();
  submitted = false;

  constructor(
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    this.userService.authenticate(this.model)
      .then(user => {
        if (user == null){
          this.submitted = false;
        } else {
          this.router.navigate(["/"]);
        }
      })
      .catch(() => {
        this.submitted = false;
      });
  }
}


