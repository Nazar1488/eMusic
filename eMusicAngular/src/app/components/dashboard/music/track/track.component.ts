import { Component, OnInit, Input } from '@angular/core';
import { Track } from 'src/app/models/track';
import { MusicService } from 'src/app/services';
import { CartService } from 'src/app/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  @Input() track: Track;

  constructor(private musicService: MusicService, private cartService: CartService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  playTrack() {
    this.musicService.playTrack(this.track.id);
  }

  addToCart() {
    this.snackBar.open("Track added to cart!", 'Close', {
      duration: 1000
    });
    this.cartService.add(this.track);
  }
}
