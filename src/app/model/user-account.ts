export class UserAccount {
  username: string;
  description: string;
  created: Date;
  karma: number;
  solved: number;
  challenges: number;
  playlists: number;
  comments: number;
  sharedSolutions: number;

  constructor(username: string) {
    this.username = username;
  }
}
