import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: 'input[lowerCase]',
  host: {
    '(input)': 'ref.nativeElement.value=$event.target.value.toLowerCase()',
  }
})
export class LowerCaseTransformer {
  constructor(private ref: ElementRef) {
  }
}
