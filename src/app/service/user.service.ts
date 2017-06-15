import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from "@angular/http";
import {User, UserRole} from "../model/user";
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
      .catch(error => this.handleError(error));
  }

  getTopUsers(property: string): Promise<UserAccount[]>{
    return this.http.get(`${this.url}/top/${property}`)
      .toPromise()
      .then(r => r.json().map(u => UserService.parseAccount(u)))
      .catch(error => this.handleError(error));
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
      .catch(error => this.handleError(error));
  }

  getUserAccount(username: string): Promise<UserAccount>{
    return this.http.get(`${this.url}/account/${username}`)
      .toPromise()
      .then(response => {
        if (response.status == 404){
          this.alertService.warning(`Пользователь <b>${username}</b> не найден`);
          return null;
        }
        return UserService.parseAccount(response.json())
      })
      .catch(error => this.handleError(error));
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
      .catch(error => this.handleError(error));
  }

  modifyUserPassword(username: string, password: string): Promise<void>{
    return this.http.post(`${this.url}/account/${username}/password`, password)
      .toPromise()
      .then(() => {
        this.alertService.success(`Пароль пользователя успешно обновлен!`);
        if (this.user.username == username)
          this.auth(btoa(`${username}:${password}`))
      })
      .catch(error => this.handleError(error));
  }

  modifyUserRole(username: string, role: UserRole): Promise<User>{
    return this.http.post(`${this.url}/account/${username}/role`, UserRole[role])
      .toPromise()
      .then((response) => {
        this.alertService.success(`Роль пользователя успешно обновлена!`);
        return Object.assign(new User(), response.json());
      })
      .catch(error => this.handleError(error));
  }

  // deleteUser(username: string): Promise<void>{
  //   return this.http.delete(`${this.url}/account/${username}`)
  //     .toPromise()
  //     .then(() => this.alertService.success(`Пользователь успешно удален!`))
  //     .catch(error => this.handleError(error));
  // }

  modifyUserPhoto(username: string, photo: File): Promise<void>{
    let formData:FormData = new FormData();
    formData.append('file', photo, photo.name);
    return this.http.post(`${this.url}/account/${username}/photo`, formData)
      .toPromise()
      .then(() => {})
      .catch(error => this.handleError(error));
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
        this.user = Object.assign(this.user? this.user : new User(), response.json());
        return this.user;
      })
      .catch(error => this.handleError(error));
  }

  logout() {
    localStorage.setItem('auth_token', null);
    this.user = null;
  }

  private static parseAccount(data: any): UserAccount {
    let account = Object.assign(new UserAccount(), data);
    account.name = data.user.name;
    account.username = data.user.username;
    account.role = data.user.role;
    return account;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    this.alertService.danger(error.message || error);
    return Promise.reject(error.message || error);
  }
}
