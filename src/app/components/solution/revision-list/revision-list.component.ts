import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Solution} from "../../../model/solution";

@Component({
  selector: 'app-revision-list',
  templateUrl: 'revision-list.component.html',
  styleUrls: ['revision-list.component.scss'],
})
export class SolutionListComponent {

  @Input()
  solutions: Solution[];

  @Input()
  active: Solution;

  @Output()
  onSelect = new EventEmitter();
}
