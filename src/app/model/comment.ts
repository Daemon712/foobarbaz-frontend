import {User} from "./user";
export class Comment {
  id: number;
  author: User;
  text: string;
  rating: number;
  liked: boolean;
  created: Date;
}
