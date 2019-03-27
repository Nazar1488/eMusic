import { Component, OnInit, Input } from '@angular/core';
import { MusicService } from 'src/app/services';
import { Track } from 'src/app/models/track';

@Component({
  selector: 'app-my-track',
  templateUrl: './my-track.component.html',
  styleUrls: ['./my-track.component.css']
})
export class MyTrackComponent implements OnInit {

  constructor(private musicService: MusicService) { }

  apiUrl = "https://localhost:44370/api";

  @Input() track: Track;
  ngOnInit() {
  }

  play() {
    this.musicService.playTrack(this.track.id);
  }

  getTrackImage() : string {
    return `${this.apiUrl}/music/image/?id=${this.track.id}`;
  }
}
