import {SolutionStatus} from "./solutions-status";

export class Revision {
  id: number;
  status: SolutionStatus;
  date: Date;

  constructor(id: number, status: SolutionStatus = SolutionStatus.empty, date?: Date) {
    this.id = id;
    this.status = status;
    this.date = date;
  }
}
