import {UserAccount} from "./user-account";
export class User {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  account: UserAccount;

  constructor(username?: string, password?: string){
    this.username = username;
    this.password = password;
  }
}
