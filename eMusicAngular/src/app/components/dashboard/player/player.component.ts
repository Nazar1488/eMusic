import { Component, OnInit} from '@angular/core';
import { MusicService } from 'src/app/services/music.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  playing: boolean;

  constructor(private musicService: MusicService) { }

  ngOnInit() {
  }

}
