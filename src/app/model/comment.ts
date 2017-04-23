export class Comment {
  id: number;
  challengeId: number;
  sharedSolId: number;
  author: string;
  text: string;
  likes: number;
  liked: boolean;
  date: Date;
}
