import {Component, Input, OnInit} from '@angular/core';
import {Playlist} from "../../../model/playlist";

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
})
export class PlaylistListComponent implements OnInit {

  @Input()
  items: Playlist[];

  constructor() { }

  ngOnInit() {
  }

}
