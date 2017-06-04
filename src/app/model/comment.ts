import {User} from "./user";
export class Comment {
  id: number;
  author: User;
  text: string;
  modify: string;
  rating: number;
  liked: boolean;
  created: Date;
}
