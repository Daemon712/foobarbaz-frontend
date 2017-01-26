import { Injectable } from '@angular/core';
import {Challenge} from "../model/challenge";

@Injectable()
export class ChallengeService {

  constructor() { }

  getChallenges(): Challenge[]{
    return [];
  }

}
