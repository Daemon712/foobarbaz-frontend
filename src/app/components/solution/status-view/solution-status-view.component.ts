import {Component, Input} from '@angular/core';
import {SolutionStatus} from "../../../model/solutions-status";

@Component({
  selector: 'app-solution-status-view',
  templateUrl: 'solution-status-view.component.html',
})
export class SolutionStatusViewComponent {

  @Input()
  status: SolutionStatus;

  revisionStatus = SolutionStatus;
}
