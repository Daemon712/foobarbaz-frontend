import {Component, OnInit, Input} from '@angular/core';
import {SharedSolution} from "../../../model/shared-solution";

@Component({
  selector: 'app-shared-solution-list',
  templateUrl: './shared-solution-list.component.html',
})
export class SharedSolutionListComponent implements OnInit {

  @Input()
  solutions: SharedSolution[];

  constructor() { }

  ngOnInit() {
  }

}
