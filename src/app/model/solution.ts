import {SolutionStatus} from "./solutions-status";
import {TestResult} from "./test-result";

export class Solution {
  solutionNum: number;
  status: SolutionStatus;
  implementation: string;
  newSolution: string;
  testResults: TestResult[];
}
