import {SolutionStatus} from "./solutions-status";
export class SharedSolution {
  id: number;
  author: string;
  comment: string;
  date: Date;
  status: SolutionStatus;
  likes: number;
  liked: boolean;
  comments: number;
}
