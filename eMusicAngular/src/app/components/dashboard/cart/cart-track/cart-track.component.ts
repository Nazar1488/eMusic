import { Component, OnInit, Input } from '@angular/core';
import { Track } from 'src/app/models/track';
import { CartService, MusicService } from 'src/app/services';

@Component({
  selector: 'app-cart-track',
  templateUrl: './cart-track.component.html',
  styleUrls: ['./cart-track.component.css']
})
export class CartTrackComponent implements OnInit {
  
  @Input() track: Track;

  constructor(private cartService: CartService, private musicService: MusicService) { }

  ngOnInit() {
  }

  play() {
    this.musicService.playTrack(this.track.id);
  }

  remove() {
    this.cartService.remove(this.track);
  }
}
