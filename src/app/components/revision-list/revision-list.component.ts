import {Component, OnInit, Input} from '@angular/core';
import {Revision, RevisionStatus} from "../../model/revision";

@Component({
  selector: 'app-revision-list',
  templateUrl: 'revision-list.component.html',
  styleUrls: ['revision-list.component.scss']
})
export class RevisionListComponent implements OnInit {

  @Input()
  revisions: Revision[];
  revisionStatus = RevisionStatus;

  constructor(
  ) { }

  ngOnInit() {
  }

}
