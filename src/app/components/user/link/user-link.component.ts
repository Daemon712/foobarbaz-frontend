import {Component, Input} from '@angular/core';
import {User} from "../../../model/user";

@Component({
  selector: 'app-user-link',
  templateUrl: './user-link.component.html',
})
export class UserLinkComponent {
  @Input() user: User;
  @Input() link = true;
}
