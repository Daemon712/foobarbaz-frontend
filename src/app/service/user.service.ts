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
        let users = response.json();
        return users.map(user => { return {
          username: user.username,
          created: user.registrationDate,
          description: user.description,
        }});
      })
      .catch(this.handleError);
  }

  signUp(user: User): Promise<User> {
    return this.http.post(this.url, {
      username: user.username,
      password: user.password,
      description: user.account.description,
    })
      .toPromise()
      .then(response => {
        if (response.status == 201){
          this.alertService.success("Вы успешно зарегистрировались");
          let user = new User();
          user.username = response.json().username;
          return user;
        } else {
          if (response.text() === 'username already in use')
            this.alertService.warning('Имя пользователя уже занято');
        }
      })
      .catch(this.handleError);
  }

  getUserAccount(username: string): Promise<UserAccount>{
    return this.http.get(`${this.url}/${username}`)
      .toPromise()
      .then(response => {
        let account = response.json();
        return {
          username: account.username,
          description: account.description,
          created: account.registrationDate,
        }
      })
      .catch(this.handleError);
  }

  authenticate(user: User): Promise<User> {
    return this.auth(btoa(`${user.username}:${user.password}`))
  }

  private auth(token: string): Promise<User> {
    localStorage.setItem('auth_token', token);
    return this.http.get(`${this.url}/current`)
      .toPromise()
      .then(response => {
        if (response.status === 401){
          this.alertService.warning("Неверное имя пользователя или пароль");
          localStorage.setItem('auth_token', null);
          return null;
        }
        let user = new User();
        user.username = response.json().username;
        this.alertService.info(`Здравствуйте, ${user.username}!`);
        this.listeners.forEach(listener => listener(user));
        return user;
      })
      .catch(this.handleError);
  }

  logout() {
    localStorage.setItem('auth_token', null);
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
