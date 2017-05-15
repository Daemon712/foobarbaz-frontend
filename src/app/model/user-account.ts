export class UserAccount {
  name: string;
  username: string;
  description: string;
  registrationDate: Date;
  rating: number;
  solutions: number;
  challenges: number;
  challengeLists: number;
  comments: number;
  sharedSolutions: number;

  constructor(username?: string) {
    this.username = username;
  }
}
