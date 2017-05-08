import {SolutionStatus} from "./solutions-status";
import {TestResult} from "./test-result";
import {User} from "./user";
import {Challenge} from "./challenge";
export class SharedSolution {
  id: number;
  challenge: Challenge;
  author: User;
  comment: string;
  implementation: string;
  created: Date;
  status: SolutionStatus;
  testResults: TestResult[];
  rating: number;
  liked: boolean;
  comments: number;
}
