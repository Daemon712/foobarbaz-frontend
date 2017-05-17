import {Component, OnInit, ViewChild} from '@angular/core';
import {AccessOption, Challenge, ChallengeDetails} from "../../../model/challenge";
import {AceEditorComponent} from "ng2-ace-editor";
import {ChallengeService} from "../../../service/challenge.service";
import {SolutionService} from "../../../service/solution.service";
import {TestResult} from "../../../model/test-result";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-challenge',
  templateUrl: 'create-challenge.component.html',
  styleUrls: ['create-challenge.component.css'],
})
export class CreateChallengeComponent implements OnInit {

  @ViewChild('solutionTemplateEditor')
  solutionTemplateEditor: AceEditorComponent;
  @ViewChild('solutionExampleEditor')
  solutionExampleEditor: AceEditorComponent;
  @ViewChild('solutionTestEditor')
  solutionTestEditor: AceEditorComponent;

  challenge: Challenge = new Challenge();
  form: FormGroup;
  accessOption = AccessOption;
  testResults: TestResult[];
  options = {
    printMargin: false,
    enableBasicAutocompletion: true,
    enableSnippets: true,
    fontSize: '16px'
  };

  submitted = null;
  testResultsActive = false;

  constructor(
    private challengeService: ChallengeService,
    private testSolutionService: SolutionService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.form = formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50)
      ])],
      shortDescription: ['', Validators.compose([
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(300)
      ])],
      fullDescription: ['', Validators.compose([
        Validators.required,
        Validators.minLength(100),
        Validators.maxLength(5000)
      ])],
    });
  }

  ngOnInit() {
    this.initDefaultValues();
  }

  onSubmit(){
    this.submitted = 'create';
    Object.assign(this.challenge, this.form.value);
    Object.assign(this.challenge.details, this.form.value);
    this.challengeService.createChallenge(this.challenge)
      .then(response => {
        this.submitted = null;
        if (typeof response === 'number') {
          this.router.navigate([`challenges/${response}`]);
        } else if (response instanceof Array) {
          this.testResults = response as TestResult[];
          this.testResultsActive = true;
        } else {
          console.error(response)
        }
      })
      .catch(() => this.submitted = false);
  }

  testExample(){
    this.submitted = 'example';
    this.testSolutionService.executeTests(this.challenge.details.unitTest, this.challenge.details.sample)
      .then(testResults => {
        this.submitted = null;
        if (testResults){
          this.testResults = testResults;
          this.testResultsActive = true;
        }
    });
  }

  displayErrors(control: string){
    return this.form.controls[control].errors &&
      (this.form.controls[control].dirty || this.form.controls[control].touched);
  }

  displayError(control: string, error: string){
    return this.form.controls[control].errors[error];
  }

  testTemplate(){
    this.submitted = 'template';
    this.testSolutionService.executeTests(this.challenge.details.unitTest, this.challenge.details.template)
      .then(testResults => {
        this.submitted = null;
        if (testResults){
          this.testResults = testResults;
          this.testResultsActive = true;
        }
      });
  }

  //Dirty hack. Because AceEditor is not rendered after tab opening
  solutionTemplateReady = false;
  openSolutionTemplate(){
    if (this.solutionTemplateReady) return;
    this.solutionTemplateReady = true;
    this.solutionTemplateEditor.getEditor().clearSelection();
  }
  solutionExampleReady = false;
  openSolutionExample(){
    if (this.solutionExampleReady) return;
    this.solutionExampleReady = true;
    this.solutionExampleEditor.getEditor().clearSelection();
  }
  solutionTestReady = false;
  openSolutionTest(){
    if (this.solutionTestReady) return;
    this.solutionTestReady = true;
    this.solutionTestEditor.getEditor().clearSelection();
  }

  private initDefaultValues(){
    this.challenge.details = new ChallengeDetails();

    this.challenge.details.template =
      "public class Foo {\n" +
      "\tpublic int bar() {\n" +
      "\t\t//...\n" +
      "\t\treturn 0;\n" +
      "\t}\n}";

    this.challenge.details.sample =
      "public class Foo {\n" +
      "\tpublic int bar() {\n" +
      "\t\treturn 1;\n" +
      "\t}\n" +
      "}";

    this.challenge.details.unitTest =
      "import org.junit.Assert;\n" +
      "import org.junit.Test;\n\n" +
      "public class FooTest {\n" +
      "\t@Test\n" +
      "\tpublic void testBar() {\n" +
      "\t\tFoo foo = new Foo();\n" +
      "\t\tint result = foo.bar();\n" +
      "\t\tAssert.assertEquals(1, result);\n" +
      "\t}\n" +
      "}";

    this.challenge.details.commentAccess = AccessOption.allow;
    this.challenge.details.shareAccess = AccessOption.solvedOnly;
    this.challenge.difficulty = 3;
  };
}
