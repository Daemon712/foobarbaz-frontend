import {Challenge} from "./challenge";
import {User} from "./user";
export class ChallengeList {
  id: number;
  name: string;
  description: string;
  challenges: Challenge[];
  author: User;
}
