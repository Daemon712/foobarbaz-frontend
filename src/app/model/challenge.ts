import {Solution} from "./solution";
import {User} from "./user";
import {Rating} from "./rating";
export class Challenge {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  status: ChallengeStatus;
  author: User;
  created: Date;
  solutionTemplate: string;
  solutionExample: string;
  solutionTest: string;
  tags: string[];
  userRating: Rating;
  rating: number;
  difficulty: number;
  views: number;
  completedSolutions: number;
  commentAccess: AccessOption;
  shareAccess: AccessOption;
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
