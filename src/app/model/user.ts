export class User {
  username: string;
  password: string;
  confirmPassword: string;

  constructor(username?: string, password?: string){
    this.username = username;
    this.password = password;
  }
}