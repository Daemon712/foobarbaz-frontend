export class Challenge {
  id: number;
  name: string;
  description: string;
  status: ChallengeStatus;
  author: string;
  created: Date;
  template: string;
}

enum ChallengeStatus {
  NotStarted,
  InProgress,
  Completed
}
