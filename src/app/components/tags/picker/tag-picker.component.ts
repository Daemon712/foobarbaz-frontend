import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {TagService} from "../../../service/tag.service";
import {Observable, Observer} from "rxjs";

@Component({
  selector: 'app-tag-picker',
  templateUrl: 'tag-picker.component.html',
  styleUrls: ['tag-picker.component.css']
})
export class TagPickerComponent implements OnInit {

  @Output()
  tagsChange = new EventEmitter();

  @Input()
  tags: string[];

  newTag: string;

  availableTags: Observable<string[]>;

  constructor(
    private tagService: TagService,
  ) { }

  ngOnInit() {
    this.availableTags = Observable
      .create((observer: Observer<string>) => observer.next(this.newTag))
      .mergeMap((newTag: string) =>
        this.tagService
            .findTags(newTag)
            .then(tags => {
              let result = tags.map(tag => tag.name);
              if (this.newTag && this.newTag.length >= 3) result.push(this.newTag);
              return this.tags ? result.filter(tagName => this.tags.indexOf(tagName) < 0) : result
            })
      );
  }

  onSelect(){
    if (this.tags == null) this.tags = [];
    this.tags.push(this.newTag);
    this.tagsChange.emit(this.tags);
    this.newTag = null;
  }

  removeTag(index: number){
    this.tags.splice(index, 1);
    this.tagsChange.emit(this.tags);
  }
}
