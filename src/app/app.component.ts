import { Component } from '@angular/core';
import {UserService} from "./service/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService) {
    let token = localStorage.getItem('auth_token');
    console.log(token);
    if (token) this.userService.auth(token);
  }
}
