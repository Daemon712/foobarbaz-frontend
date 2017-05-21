import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../service/user.service";
import {UserAccount} from "../../../model/user-account";
import {Page} from "../../../model/page";

@Component({
  selector: 'app-user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.css']
})
export class UserListComponent implements OnInit {
  page: Page<UserAccount>;
  search: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers()
      .then(page => this.page = page);
  }

  changePage(pageNumber: number){
    this.page.content = null;
    this.userService.getUsers(pageNumber, this.search)
      .then(page => this.page = page);
  }

  changeSearch(search: string){
    this.page.content = null;
    this.search = search;
    this.userService.getUsers(null, this.search)
      .then(page => this.page = page);
  }
}
