import { Injectable } from '@angular/core';
import { Track } from '../models/track';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  audio = new Audio();
  playing: boolean;
  currentTrack: Track;
  availableTracks: Track[];

  constructor() { 
    this.currentTrack = new Track;
    this.currentTrack.artist = "Test";
    this.currentTrack.title = "Test";
    this.currentTrack.trackPath = '/../assets/music/track.mp3';
  }

  playTrack() {
    this.currentTrack.trackPath = '/../assets/music/track.mp3'
    this.audio.src = this.currentTrack.trackPath;
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
}