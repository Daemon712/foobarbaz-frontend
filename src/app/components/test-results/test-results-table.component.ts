import {Component, OnInit, Input} from '@angular/core';
import {TestResult, TestStatus} from "../../model/test-result";

@Component({
  selector: 'app-test-results-table',
  templateUrl: 'test-results-table.component.html',
  styleUrls: ['test-results-table.component.css']
})
export class TestResultsTableComponent implements OnInit {

  @Input()
  testResults: TestResult[];

  testStatus = TestStatus;

  constructor() { }

  ngOnInit() {
  }

}
