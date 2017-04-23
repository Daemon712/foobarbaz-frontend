import { Injectable } from '@angular/core';
import {Playlist} from "../model/playlist";
import {Http} from "@angular/http";

@Injectable()
export class PlaylistService {

  url = '/api/playlists/';

  constructor(
    private http: Http,
  ) { }

  getPlaylists(): Promise<Playlist[]>{
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json().data as Playlist[]);
  }
}
