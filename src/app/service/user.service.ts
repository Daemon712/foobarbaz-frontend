import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {User} from "../model/user";
import {AlertService} from "./alert.service";
import {UserAccount} from "../model/user-account";

@Injectable()
export class UserService {
  private url = 'api/users';
  private listeners: ((User) => void)[] = [];

  constructor(
    private http: Http,
    private alertService: AlertService
  ) { }

  getUsers(): Promise<UserAccount[]>{
    return this.http.get(this.url)
      .toPromise()
      .then(response => {
        let users = response.json().data as User[];
        users.forEach(user => user.password = null);
        return users.map(user => user.account);
      })
      .catch(this.handleError);
  }

  addUser(user: User): Promise<User> {
    return this.http.post(this.url, user)
      .toPromise()
      .then(response => {
        this.alertService.success("Вы успешно зарегистрировались");
        return response.json().date as User;
      })
      .catch(this.handleError);
  }

  getUserAccount(username: string): Promise<UserAccount>{
    return this.http.get(`${this.url}?username=${username}`)
      .toPromise()
      .then(response => {
        let user = response.json().data[0] as User;
        return user.account;
      })
      .catch(this.handleError);
  }

  authenticate(user: User): Promise<User> {
    return this.http.get(`${this.url}?username=${user.username}&password=${user.password}`)
      .toPromise()
      .then(response => {
        let user = response.json().data[0] as User;

        if (user == null){
          this.alertService.warning("Неверное имя пользователя или пароль");
          return null;
        }

        this.alertService.info(`Здравствуйте, ${user.username}!`);
        this.listeners.forEach(listener => listener(user));
        return user;
      })
      .catch(this.handleError);
  }

  logout() {
    this.listeners.forEach(l => l(null));
  }

  addListener(listner: (User) => void){
    this.listeners.push(listner);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    this.alertService.danger(error.message || error);
    return Promise.reject(error.message || error);
  }
}
