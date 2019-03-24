import { Component, OnInit, Input } from '@angular/core';
import { Track } from 'src/app/models/track';
import { CartService, MusicService } from 'src/app/services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart-track',
  templateUrl: './cart-track.component.html',
  styleUrls: ['./cart-track.component.css']
})
export class CartTrackComponent implements OnInit {
  
  @Input() track: Track;
  apiUrl = "https://localhost:44370/api";

  constructor(private cartService: CartService, private musicService: MusicService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  play() {
    this.musicService.playTrack(this.track.id);
  }

  getTrackImage() : string {
    return `${this.apiUrl}/music/image/?id=${this.track.id}`;
  }

  remove() {
    this.snackBar.open("Track removed from cart!", 'Close', {
      duration: 1000
    });
    this.cartService.remove(this.track);
  }
}
