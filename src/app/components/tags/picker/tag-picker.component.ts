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

  @Input()
  max = 5;

  newTag: string;
  allTags: string[];
  availableTags: Observable<string[]>;

  constructor(
    private tagService: TagService,
  ) { }

  ngOnInit() {
    this.tagService.getTags().then(tags => this.allTags = tags.map(t => t.name));

    this.availableTags = Observable
      .create((observer: Observer<string>) => observer.next(this.newTag))
      .mergeMap((newTag: string) => {
          if (this.tags && this.tags.length >= this.max)
            return Observable.never;

          let query = new RegExp(newTag, 'ig');
          let result = this.allTags.filter(tag => query.test(tag));
          if (newTag && newTag.length >= 3 && result.indexOf(newTag) < 0)
            result.push(newTag);
          if (this.tags)
            result = result.filter(tagName => this.tags.indexOf(tagName) < 0);
          return Observable.of(result);
      });
  }

  onSelect(){
    if (this.tags == null) this.tags = [];
    this.tags.push(this.newTag);
    this.tagsChange.emit(this.tags);
    this.newTag = '';
  }

  removeTag(index: number){
    this.tags.splice(index, 1);
    this.tagsChange.emit(this.tags);
  }
}
