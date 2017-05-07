import { Component, OnInit } from '@angular/core';
import {Tag} from "../../../model/tag";
import {TagService} from "../../../service/tag.service";

@Component({
  selector: 'app-tags',
  templateUrl: 'top-tags.component.html',
})
export class TopTagsComponent implements OnInit {
  tags: Tag[];
  minUsages: number;
  maxUsages: number;

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.tagService.getTags().then(
      tags => {
        this.tags = tags;
        this.minUsages = tags.map(t => t.usages).reduce((a, b) => a < b ? a : b);
        this.maxUsages = tags.map(t => t.usages).reduce((a, b) => a > b ? a : b);
      }
    );
  }

}
