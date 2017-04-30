import {Component} from '@angular/core';
import {User} from "../../../model/user";
import {UserService} from "../../../service/user.service";
import {Router} from "@angular/router";
import {UserAccount} from "../../../model/user-account";

@Component({
  selector: 'app-signup',
  templateUrl: 'sign-up.component.html',
})
export class SignUpComponent {
  model: User;
  submitted = false;

  constructor(private userService: UserService,
              private router: Router,) {
    this.model = new User();
    this.model.account = new UserAccount();
  }

  onSubmit() {
    this.submitted = true;
    this.userService.signUp(this.model)
      .then((user) => {
          if (user == null) {
            this.submitted = false;
          } else {
            this.router.navigate(["login"]);
          }
        }
      )
      .catch(() => this.submitted = false);
  }
}
