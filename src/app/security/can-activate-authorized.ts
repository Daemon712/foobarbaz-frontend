import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {UserService} from "../service/user.service";
import {Injectable} from "@angular/core";
import {AlertService} from "../service/alert.service";

@Injectable()
export class CanActivateAuthorized implements CanActivate{

  constructor(
    private userService: UserService,
    private alertService: AlertService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let authorized =  this.userService.user != null;
    if (!authorized) this.alertService.warning("Эта функция доступна только зарегистрированным пользователям");
    return authorized;
  }
}
