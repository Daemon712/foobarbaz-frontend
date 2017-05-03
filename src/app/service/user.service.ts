import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {User} from "../model/user";
import {AlertService} from "./alert.service";
import {UserAccount} from "../model/user-account";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserService {
  private url = 'api/users';
  private _user: User;
  private userSubject : Subject<User> = new Subject<User>();
  userObservable : Observable<any> = this.userSubject.asObservable();

  constructor(
    private http: Http,
    private alertService: AlertService
  ) { }

  get user() {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
    this.userSubject.next(value);
  }

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
          solved: account.solutions,
        }
      })
      .catch(this.handleError);
  }

  authenticate(user: User): Promise<User> {
    return this.auth(btoa(`${user.username}:${user.password}`))
      .then(user => {
        if (user == null){
          this.alertService.warning("Неверное имя пользователя или пароль");
        } else {
          this.alertService.info(`Здравствуйте, <b>${user.username}</b>!`);
        }
        return user;
      });
  }

  auth(token: string): Promise<User> {
    localStorage.setItem('auth_token', token);
    return this.http.get(`${this.url}/current`)
      .toPromise()
      .then(response => {
        if (response.status === 401){
          localStorage.setItem('auth_token', null);
          return null;
        }
        this.user = new User(response.json().username);
        return this.user;
      })
      .catch(this.handleError);
  }

  logout() {
    localStorage.setItem('auth_token', null);
    this.user = null;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    this.alertService.danger(error.message || error);
    return Promise.reject(error.message || error);
  }
}
