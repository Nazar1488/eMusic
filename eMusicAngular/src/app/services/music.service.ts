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
    this.currentTrack = this.availableTracks[0];
    this.audio.src = this.currentTrack.trackPath;
    this.audio.load();
    this.audio.onended = this.nextTrack;
  }


  ngOnInit(): void {
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