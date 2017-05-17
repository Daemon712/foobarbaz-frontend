export class TestResult {
  testName: string;
  status: TestStatus;
  message: string;
}

export enum TestStatus {
  ignored,
  success,
  failed,
  error,
}
