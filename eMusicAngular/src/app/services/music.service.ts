import { Injectable, OnInit } from '@angular/core';
import { Track } from '../models/track';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MusicService implements OnInit {

  apiUrl = "https://localhost:44370/api";
  audio = new Audio();
  previousVolume: number;
  playing: boolean;
  currentTrack: Track;
  availableTracks: Track[];

  constructor(private http: HttpClient) {
    this.http.get<Track[]>(`${this.apiUrl}/music/all`).subscribe(tracks => {
      this.availableTracks = tracks;
      this.currentTrack = this.availableTracks[0];
      this.audio.src = this.getCurrentTrack();
      this.audio.load();
      this.audio.onended = this.nextTrack;
    });
  }

  ngOnInit(): void {
  }

  getCurrentTrackImage() : string {
    return `${this.apiUrl}/music/image/?id=${this.currentTrack.id}`;
  }

  getCurrentTrack() : string {
    return `${this.apiUrl}/music/track/?id=${this.currentTrack.id}`;
  }

  playTrack(trackId: string) {
    this.currentTrack = this.availableTracks.find(t => t.id == trackId);
    this.audio.src = this.getCurrentTrack();
    this.audio.load();
    this.audio.play();
    this.playing = true;
  }

  play() {
    this.playing = true;
    this.audio.play();
  }

  pause() {
    this.playing = false;
    this.audio.pause();
  }

  nextTrack() {
    if (this.currentTrack != null) {
      var index = this.availableTracks.findIndex(t => t.id == this.currentTrack.id);
      if (index == this.availableTracks.length - 1) {
        index = -1;
      }
      this.currentTrack = this.availableTracks[index + 1];
      this.audio.src = this.currentTrack.trackPath;
      this.audio.load();
      this.audio.play();
      this.playing = true;
    }
  }

  previousTrack() {
    if (this.currentTrack != null) {
      var index = this.availableTracks.findIndex(t => t.id == this.currentTrack.id);
      if (index == 0) {
        index = this.availableTracks.length;
      }
      this.currentTrack = this.availableTracks[index - 1];
      this.audio.src = this.currentTrack.trackPath;
      this.audio.load();
      this.audio.play();
      this.playing = true;
    }
  }

  mute() {
    if (this.audio.volume == 0) {
      this.audio.volume = this.previousVolume;
    }
    else {
      this.previousVolume = this.audio.volume;
      this.audio.volume = 0;
    }
  }
}