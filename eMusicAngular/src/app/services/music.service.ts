import { Injectable, OnInit } from '@angular/core';
import { Track } from '../models/track';

@Injectable({
  providedIn: 'root'
})
export class MusicService implements OnInit {

  audio = new Audio();
  previousVolume: number;
  playing: boolean;
  currentTrack: Track;
  availableTracks = [
    new Track("track1", '/../assets/music/track1.mp3', '/../assets/images/track1.jpg', "MOLLY", "Не плачу", 2),
    new Track("track2", '/../assets/music/track2.mp3', '/../assets/images/track2.jpg', "АРИТМИЯ", "Помада", 2),
    new Track("track3", '/../assets/music/track3.mp3', '/../assets/images/track3.jpg', "Martin Garrix", "No sleep", 5),
    new Track("track4", '/../assets/music/track4.mp3', '/../assets/images/track4.jpg', "KAZKA", "Плакала", 10)
  ];

  constructor() {
  }


  ngOnInit(): void {
    this.audio.onended = this.playNext;
  }


  playTrack(trackId: string) {
    this.currentTrack = this.availableTracks.find(t => t.id == trackId);
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

  playNext() {
    var index = this.availableTracks.findIndex(t => t.id == this.currentTrack.id);
    this.currentTrack = this.availableTracks[index];
    this.audio.src = this.currentTrack.trackPath;
    this.audio.load();
    this.audio.play();
    this.playing = true;
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