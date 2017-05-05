import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../service/user.service";
import {UserAccount} from "../../../model/user-account";
import {Page} from "../../../model/page";

@Component({
  selector: 'app-user-list',
  templateUrl: 'user-list.component.html',
})
export class UserListComponent implements OnInit {
  page: Page<UserAccount>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers()
      .then(page => this.page = page);
  }

  reloadPage(pageNumber: number){
    this.page.content = null;
    this.userService.getUsers(pageNumber)
      .then(page => this.page = page);
  }
}
