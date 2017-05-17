import {Solution} from "./solution";
import {User} from "./user";
import {Rating} from "./rating";
export class Challenge {
  id: number;
  name: string;
  shortDescription: string;
  author: User;
  created: Date;
  rating: number;
  difficulty: number;
  tags: string[];
  status: ChallengeStatus;
  details: ChallengeDetails;
}

export class ChallengeDetails {
  fullDescription: string;
  template: string;
  unitTest: string;
  sample: string;
  views: number;
  solutions: number;
  commentAccess: AccessOption;
  shareAccess: AccessOption;
  userDetails: ChallengeUserDetails;
}

export class ChallengeUserDetails {
  rating: Rating;
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
