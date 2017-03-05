import {Component, OnInit, ViewChild} from '@angular/core';
import {Challenge} from "../../../model/challenge";
import {AceEditorComponent} from "ng2-ace-editor";

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
  options = {
    fontSize: '16px'
  };

  constructor() { }

  ngOnInit() {
    this.initDefaultValues();
  }

  onSubmit(){

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
