import { Component, OnInit } from '@angular/core';
import { MusicService } from 'src/app/services/music.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {

  constructor(private musicService: MusicService) { }

  ngOnInit() {
  }

  play() {
    this.musicService.playTrack();
  }
}
