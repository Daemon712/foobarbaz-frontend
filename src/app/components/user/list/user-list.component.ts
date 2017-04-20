import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../service/user.service";
import {UserAccount} from "../../../model/user-account";

@Component({
  selector: 'app-user-list',
  templateUrl: 'user-list.component.html',
})
export class UserListComponent implements OnInit {
  users: UserAccount[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().then(
      users => {
        this.users = users;
      }
    );
  }
}
