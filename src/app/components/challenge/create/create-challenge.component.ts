import { Component, OnInit } from '@angular/core';
import {Challenge} from "../../../model/challenge";

@Component({
  selector: 'app-create-challenge',
  templateUrl: 'create-challenge.component.html',
  styleUrls: ['create-challenge.component.css'],
})
export class CreateChallengeComponent implements OnInit {

  model: Challenge = new Challenge();
  options = {
    fontSize: '16px'
  };
  newTag: string;
  //TODO: load availableTags from TagService
  availableTags: string[] = [
    "Массивы",
    "Списки",
    "Рекурсия",
    "Строки",
    "Математика",
    "Бинарные операции",
    "Ввод-вывод"
  ];

  constructor() { }

  ngOnInit() {
    this.initDefaultValues();
  }

  onSubmit(){

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

  onSelect(){
    this.model.tags.push(this.newTag);
    this.newTag = null;
  }
}
