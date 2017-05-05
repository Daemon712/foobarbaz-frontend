export class UserAccount {
  username: string;
  description: string;
  registrationDate: Date;
  rating: number;
  solutions: number;
  challenges: number;
  playlists: number;
  comments: number;
  sharedSolutions: number;

  constructor(username?: string) {
    this.username = username;
  }
}
