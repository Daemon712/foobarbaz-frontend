import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Solution} from "../../../model/solution";

@Component({
  selector: 'app-revision-list',
  templateUrl: 'solution-list.component.html',
  styleUrls: ['solution-list.component.scss'],
})
export class SolutionListComponent {

  @Input()
  solutions: Solution[];

  @Input()
  active: Solution;

  @Output()
  onSelect = new EventEmitter();
}
