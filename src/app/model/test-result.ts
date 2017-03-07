export class TestResult {
  testName: string;
  status: TestStatus;
  message: string;

  constructor(testName: string, status: TestStatus, message?: string) {
    this.testName = testName;
    this.status = status;
    this.message = message;
  }
}

export enum TestStatus {
  success,
  failed,
  error,
  ignored,
}
