import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-tags-line',
  templateUrl: './tags-line.component.html',
})
export class TagsLineComponent{
  @Input()
  tags: string[];
}
