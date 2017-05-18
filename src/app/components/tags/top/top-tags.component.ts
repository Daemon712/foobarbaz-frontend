import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Tag} from "../../../model/tag";
import {TagService} from "../../../service/tag.service";

@Component({
  selector: 'app-tags',
  templateUrl: 'top-tags.component.html',
})
export class TopTagsComponent implements OnInit {
  tags: Tag[];
  selected: Tag;
  minUsages: number;
  maxUsages: number;
  @Output()
  tagSelected = new EventEmitter();

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.tagService.getTags().then(
      tags => {
        this.tags = tags.sort((a, b) => a.name > b.name ? 1 : -1);
        if (tags.length) {
          this.minUsages = tags.map(t => t.usages).reduce((a, b) => a < b ? a : b);
          this.maxUsages = tags.map(t => t.usages).reduce((a, b) => a > b ? a : b);
        }
      }
    );
  }

  selectTag(tag: Tag): boolean{
    if (this.selected == tag){
      this.selected = null;
    } else {
      this.selected = tag;
    }
    this.tagSelected.emit(this.selected);
    return false;
  }

}
