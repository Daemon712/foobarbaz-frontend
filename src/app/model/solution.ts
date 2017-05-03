import {SolutionStatus} from "./solutions-status";
import {TestResult} from "./test-result";

export class Solution {
  id: number;
  name: string;
  status: SolutionStatus;
  solution: string;
  newSolution: string;
  testResults: TestResult[];

  constructor(id?: number, name?: string, status: SolutionStatus = SolutionStatus.empty, solution?: string) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.solution = solution;
    this.newSolution = solution;
  }
}
