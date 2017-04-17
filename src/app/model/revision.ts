import {SolutionStatus} from "./solutions-status";
import {TestResult} from "./test-result";

export class Revision {
  id: number;
  name: string;
  status: SolutionStatus;
  date: Date;
  solution: string;
  newSolution: string;
  testResults: TestResult[];

  constructor(id?: number, name?: string, status: SolutionStatus = SolutionStatus.empty, date = new Date(), solution?: string) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.date = date;
    this.solution = solution;
    this.newSolution = solution;
  }
}
