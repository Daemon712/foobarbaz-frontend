import { Component, OnInit } from '@angular/core';
import {AlertService} from "../../service/alert.service";
import {Alert, AlertType} from "../../model/alert";

@Component({
  selector: 'app-alerts',
  templateUrl: 'alerts.component.html',
  styleUrls: ['alerts.component.css']
})
export class AlertsComponent implements OnInit {
  alerts: Alert[] = [];
  alertType = AlertType;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.addListener(alert => {
      this.alerts.push(alert);
    });
  }
}
