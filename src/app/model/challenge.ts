import {Solution} from "./solution";
import {User} from "./user";
export class Challenge {
  id: number;
  name: string;
  abstract: string;
  description: string;
  status: ChallengeStatus;
  author: User;
  created: Date;
  solutionTemplate: string;
  solutionExample: string;
  solutionTest: string;
  tags: string[];
  rating: number;
  userRating: number;
  difficulty: number;
  userDifficulty: number;
  comments: number;
  views: number;
  completedSolutions: number;
  sharedSolutions: number;
  commentAccess: AccessOption;
  sharedSolutionAccess: AccessOption;
  bookmark: boolean;
  solutions: Solution[];
}

export enum ChallengeStatus {
  NotStarted,
  InProgress,
  Completed
}

export enum AccessOption {
  allow,
  deny,
  solvedOnly,
}
