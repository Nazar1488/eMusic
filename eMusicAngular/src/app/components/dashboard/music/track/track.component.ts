import { Component, OnInit, Input } from '@angular/core';
import { Track } from 'src/app/models/track';
import { MusicService } from 'src/app/services';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  @Input() track: Track;

  constructor(private musicService: MusicService) { }

  ngOnInit() {
  }

  playTrack() {
    this.musicService.playTrack(this.track.id);
  }

}
