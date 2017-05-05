import {SolutionStatus} from "./solutions-status";
import {TestResult} from "./test-result";
import {User} from "./user";
export class SharedSolution {
  id: number;
  challengeId: number;
  author: User;
  comment: string;
  text: string;
  date: Date;
  status: SolutionStatus;
  testResults: TestResult[];
  likes: number;
  liked: boolean;
  comments: number;
}
