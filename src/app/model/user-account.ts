export class UserAccount {
  username: string;
  description: string;
  created: Date;
  karma: number;
  solved: number;
  challenges: number;
  collections: number;
  comments: number;
  sharedSolutions: number;

  constructor(username: string) {
    this.username = username;
  }
}
