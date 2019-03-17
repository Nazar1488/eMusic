import { Component, OnInit, Input } from '@angular/core';
import { Track } from 'src/app/models/track';
import { MusicService } from 'src/app/services';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  @Input() track: Track;

  constructor(private musicService: MusicService, private cartService: CartService) { }

  ngOnInit() {
  }

  playTrack() {
    this.musicService.playTrack(this.track.id);
  }

  addToCart() {
    this.cartService.add(this.track);
  }
}
