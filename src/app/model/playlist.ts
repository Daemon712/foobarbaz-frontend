import {Challenge} from "./challenge";
import {User} from "./user";
export class Playlist {
  id: number;
  name: string;
  description: string;
  challenges: Challenge[];
  author: User;
}
