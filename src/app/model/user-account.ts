export class UserAccount {
  username: string;
  created: Date;
  karma: number;
  solved: number;

  constructor(username: string, created: Date, karma = 0, solved = 0) {
    this.username = username;
    this.created = created;
    this.karma = karma;
    this.solved = solved;
  }
}
