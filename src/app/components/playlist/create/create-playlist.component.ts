import { Component, OnInit } from '@angular/core';
import {Playlist} from "../../../model/playlist";
import {PlaylistService} from "../../../service/playlist.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.scss']
})
export class CreatePlaylistComponent implements OnInit {

  playlist = new Playlist();
  submitted = false;

  constructor(
    private playlistService: PlaylistService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.submitted = true;
    this.playlistService.addPlaylist(this.playlist)
      .then(playlist => this.router.navigate(['/playlists']));
  }

}
