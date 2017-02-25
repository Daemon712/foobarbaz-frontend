export class Challenge {
  id: number;
  name: string;
  description: string;
  status: ChallengeStatus;
  author: string;
  created: Date;
  solutionTemplate: string;
  solutionExample: string;
  solutionTest: string;
  tags: string[];
  likes: number;
  liked: boolean;
  comments: number;
}

export enum ChallengeStatus {
  NotStarted,
  InProgress,
  Completed
}
