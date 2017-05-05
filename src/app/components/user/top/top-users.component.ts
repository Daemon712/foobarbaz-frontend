import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../service/user.service";
import {UserAccount} from "../../../model/user-account";

@Component({
  selector: 'app-top-users',
  templateUrl: './top-users.component.html',
})
export class TopUsersComponent implements OnInit {
  @Input()
  property: string;

  users: UserAccount[];

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.getTopUsers(this.property)
      .then(users => this.users = users);
  }

}
