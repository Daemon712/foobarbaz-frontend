import {User} from "./user";
export class Comment {
  id: number;
  author: User;
  text: string;
  likes: number;
  liked: boolean;
  created: Date;
}
