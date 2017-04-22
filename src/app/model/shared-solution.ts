import {SolutionStatus} from "./solutions-status";
import {TestResult} from "./test-result";
export class SharedSolution {
  id: number;
  challengeId: number;
  author: string;
  comment: string;
  text: string;
  date: Date;
  status: SolutionStatus;
  testResults: TestResult[];
  likes: number;
  liked: boolean;
  comments: number;
}
