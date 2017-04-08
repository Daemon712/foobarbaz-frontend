import {SolutionStatus} from "./solutions-status";

export class Revision {
  id: number;
  status: SolutionStatus;
  date: Date;
  testResults: {
    success: number,
    error: number,
    failed: number,
  };

  constructor(id: number, status: SolutionStatus = SolutionStatus.empty, date?: Date, success = 0, failed = 0, error = 0) {
    this.id = id;
    this.status = status;
    this.date = date;
    this.testResults = {
      success: success,
      failed: failed,
      error: error
    };
  }
}
