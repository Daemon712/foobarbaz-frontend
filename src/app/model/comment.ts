import {User} from "./user";
export class Comment {
  id: number;
  challengeId: number;
  sharedSolId: number;
  author: User;
  text: string;
  likes: number;
  liked: boolean;
  date: Date;
}
