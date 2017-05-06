import { Injectable } from '@angular/core';
import {Playlist} from "../model/playlist";
import {Http} from "@angular/http";
import {AlertService} from "./alert.service";

@Injectable()
export class PlaylistService {

  url = '/api/playlists';

  constructor(
    private http: Http,
    private alertService: AlertService,
  ) { }

  getPlaylists(): Promise<Playlist[]>{
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json().data as Playlist[]);
  }

  getPlaylistsByAuthor(author: string){
    return this.http.get(`${this.url}?author=${author}`)
      .toPromise()
      .then(response => response.json().data as Playlist[]);
  }

  getPlaylist(id: number): Promise<Playlist>{
    return this.http.get(`${this.url}/${id}`)
      .toPromise()
      .then(response => {
        return response.json().data as Playlist;
      });
  }

  addPlaylist(playlist: Playlist): Promise<Playlist>{
    return this.http.post(this.url, playlist)
      .toPromise()
      .then(response => {
        let playlist = response.json().data as Playlist;
        if (playlist) this.alertService.success("Вы успешно создали задачу");
        else this.alertService.warning("Не удалось создать задачу");
        return playlist;
      });
  }
}
