import { Component, OnInit } from '@angular/core';
import {ChallengeList} from "../../../model/challenege-list";
import {ChallengeListService} from "../../../service/challenge-list.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-challenge-list',
  templateUrl: './create-challenge-list.component.html',
})
export class CreateChallengeListComponent implements OnInit {

  challengeList = new ChallengeList();
  submitted = false;

  constructor(
    private challengeListService: ChallengeListService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.submitted = true;
    this.challengeListService.addChallengeList(this.challengeList)
      .then(list => this.router.navigate(['/challenge-lists']));
  }

}
