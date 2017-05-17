import {Component, OnInit, ViewChild} from '@angular/core';
import {AccessOption, Challenge} from "../../../model/challenge";
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

  model: Challenge = new Challenge();
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
      description: ['', Validators.compose([
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
    Object.assign(this.model, this.form.value);
    this.challengeService.createChallenge(this.model)
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
    this.testSolutionService.executeTests(this.model.solutionTest, this.model.solutionExample)
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
    this.testSolutionService.executeTests(this.model.solutionTest, this.model.solutionTemplate)
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
    this.model.solutionTemplate =
      "public class Foo {\n" +
      "\tpublic int bar() {\n" +
      "\t\t//...\n" +
      "\t\treturn 0;\n" +
      "\t}\n}";

    this.model.solutionExample =
      "public class Foo {\n" +
      "\tpublic int bar() {\n" +
      "\t\treturn 1;\n" +
      "\t}\n" +
      "}";

    this.model.solutionTest =
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

    this.model.commentAccess = AccessOption.allow;
    this.model.shareAccess = AccessOption.solvedOnly;
    this.model.difficulty = 3;
  };
}
