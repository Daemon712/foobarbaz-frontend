import { Component } from '@angular/core';
import {UserService} from "./service/user.service";
import {User} from "./model/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService) {
    let token = localStorage.getItem('auth_token');
    let user = atob(token).split(':');
    this.userService.user = new User(user[0], user[1]);
    if (token) this.userService.auth(token);
  }
}
