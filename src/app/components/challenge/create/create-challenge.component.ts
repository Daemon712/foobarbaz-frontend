import {Component, OnInit, ViewChild} from '@angular/core';
import {AccessOption, Challenge} from "../../../model/challenge";
import {AceEditorComponent} from "ng2-ace-editor";
import {ChallengeService} from "../../../service/challenge.service";
import {TestSolutionService} from "../../../service/test-solution.service";
import {TestResult} from "../../../model/test-result";
import {Router} from "@angular/router";

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
  accessOption = AccessOption;
  testResults: TestResult[];
  options = {
    printMargin: false,
    enableBasicAutocompletion: true,
    enableSnippets: true,
    fontSize: '16px'
  };

  submitted = false;
  testResultsActive = false;

  constructor(
    private challengeService: ChallengeService,
    private testSolutionService: TestSolutionService,
    private router: Router,
  ) {
    this.model.commentAccess = AccessOption.allow;
    this.model.sharedSolutionAccess = AccessOption.solvedOnly;
    this.model.difficulty = 0.5;
  }

  ngOnInit() {
    this.initDefaultValues();
  }

  onSubmit(){
    this.submitted = true;
    this.challengeService.createChallenge(this.model)
      .then(challenge => {
        if (!challenge) {
          this.submitted = false;
        } else {
          this.router.navigate([`challenges/${challenge.id}`]);
        }
      });
  }

  testSolution(){
    this.submitted = true;
    this.testSolutionService.testSolutionExample(this.model)
      .then(testResults => {
        this.submitted = false;
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
      "}"
  };
}
