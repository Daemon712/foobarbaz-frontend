import {Component, Input, OnInit} from "@angular/core";
import {SolutionStatus} from "../../../model/solutions-status";

@Component({
  selector: 'app-solution-status-view',
  templateUrl: 'solution-status-view.component.html',
})
export class SolutionStatusViewComponent {

  @Input()
  status: SolutionStatus;

  @Input()
  text: boolean = false;

  statusEnum = SolutionStatus;

  views = {
    success:  new StatusView("Тесты успешно пройдены", "success", "check", "success"),
    failed:   new StatusView("Тесты не пройдены", "warning", "remove", "warning"),
    error:    new StatusView("Есть ошибки", "danger", "remove", "danger"),
    empty:    new StatusView("Не тестировалось", "muted", "circle-o", "default"),
    created:  new StatusView("Новое решение", "primary", "asterisk", "primary"),
  };
}
class StatusView {
  label: string;
  labelColor: string;
  badge: string;
  badgeColor: string;


  constructor(label: string, labelColor: string, badge: string, badgeColor: string) {
    this.label = label;
    this.labelColor = labelColor;
    this.badge = badge;
    this.badgeColor = badgeColor;
  }
}
