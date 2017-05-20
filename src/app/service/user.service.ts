import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from "@angular/http";
import {User} from "../model/user";
import {AlertService} from "./alert.service";
import {UserAccount} from "../model/user-account";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Page} from "../model/page";

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

  getUsers(page?: number, search?: string): Promise<Page<UserAccount>>{
    let params = new URLSearchParams();
    if (page) params.set("page", page.toString());
    if (search) params.set("search", search);
    return this.http.get(this.url, {params: params})
      .toPromise()
      .then(response => {
        let data = response.json();
        return {
          content: data.content.map(user => UserService.parseAccount(user)),
          totalElements: data.totalElements,
          number: data.number,
        };
      })
      .catch(this.handleError);
  }

  getTopUsers(property: string): Promise<UserAccount[]>{
    return this.http.get(`${this.url}/top/${property}`)
      .toPromise()
      .then(r => r.json().map(u => UserService.parseAccount(u)))
      .catch(this.handleError);
  }

  signUp(user: User): Promise<User> {
    return this.http.post(this.url, {
      name: user.name,
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
          user.name = response.json().name;
          return user;
        } else {
          if (response.text() === 'username already in use')
            this.alertService.warning('Имя пользователя уже занято');
        }
      })
      .catch(this.handleError);
  }

  getUserAccount(username: string): Promise<UserAccount>{
    return this.http.get(`${this.url}/account/${username}`)
      .toPromise()
      .then(response => UserService.parseAccount(response.json()))
      .catch(this.handleError);
  }

  modifyUserAccount(userAccount: UserAccount): Promise<UserAccount>{
    let info = {name: userAccount.name, description: userAccount.description};
    return this.http.post(`${this.url}/account/${userAccount.username}`, info)
      .toPromise()
      .then(response => {
        this.alertService.success(`Информация о пользователе успешно обновлена!`);
        if (this.user.username == userAccount.username)
          this.user.name = userAccount.name;
        return UserService.parseAccount(response.json())
      })
      .catch(this.handleError);
  }

  modifyUserPassword(username: string, password: string): Promise<void>{
    return this.http.post(`${this.url}/account/${username}/password`, password)
      .toPromise()
      .then(() => {
        this.alertService.success(`Пароль пользователя успешно обновлен!`);
        if (this.user.username == username)
          this.auth(btoa(`${username}:${password}`))
      })
      .catch(this.handleError);
  }

  authenticate(user: User): Promise<User> {
    return this.auth(btoa(`${user.username}:${user.password}`))
      .then(user => {
        if (user == null){
          this.alertService.warning("Неверное имя пользователя или пароль");
        } else {
          this.alertService.info(`Здравствуйте, <b>${user.name || user.username}</b>!`);
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
        this.user = {
          username: response.json().username,
          name: response.json().name
        } as User;
        return this.user;
      })
      .catch(this.handleError);
  }

  logout() {
    localStorage.setItem('auth_token', null);
    this.user = null;
  }

  private static parseAccount(account: any): UserAccount {
    return {
      name: account.user.name,
      username: account.user.username,
      description: account.description,
      registrationDate: account.registrationDate,
      solutions: account.solutions,
      challenges: account.challenges,
      sharedSolutions: account.sharedSolutions,
      rating: account.rating,
    } as UserAccount;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    this.alertService.danger(error.message || error);
    return Promise.reject(error.message || error);
  }
}
