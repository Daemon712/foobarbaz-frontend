export class Revision {
  id: number;
  status: RevisionStatus;
  date: Date;

  constructor(id: number, status: RevisionStatus = RevisionStatus.empty, date?: Date) {
    this.id = id;
    this.status = status;
    this.date = date;
  }
}

export enum RevisionStatus {
  success,
  failed,
  error,
  empty,
}
