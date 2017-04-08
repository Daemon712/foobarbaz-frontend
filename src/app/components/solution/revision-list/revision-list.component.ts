import {Component, OnInit, Input} from '@angular/core';
import {Revision} from "../../../model/revision";

@Component({
  selector: 'app-revision-list',
  templateUrl: 'revision-list.component.html',
})
export class RevisionListComponent implements OnInit {

  @Input()
  revisions: Revision[];

  constructor(
  ) { }

  ngOnInit() {
  }

  width(value: number, rev: Revision){
    const sum = rev.testResults.success + rev.testResults.error + rev.testResults.failed;
    return sum === 0 ? "0" : (100 * value / sum) + "%";
  }
}
