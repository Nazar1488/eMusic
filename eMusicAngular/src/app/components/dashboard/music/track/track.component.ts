import { Component, OnInit, Input } from '@angular/core';
import { Track } from 'src/app/models/track';
import { MusicService } from 'src/app/services';
import { CartService } from 'src/app/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  @Input() track: Track;
  apiUrl = "https://localhost:44370/api";

  constructor(private musicService: MusicService, private cartService: CartService, private snackBar: MatSnackBar, private http: HttpClient) { }

  ngOnInit() {
  }

  playTrack() {
    this.musicService.playTrack(this.track.id);
  }

  getTrackImage() : string {
    return `${this.apiUrl}/music/image/?id=${this.track.id}`;
  }

  addToCart() {
    if (this.cartService.add(this.track) == true) {
      this.snackBar.open("Track added to cart!", 'Close', {
        duration: 1000
      });
    }
    else {
      this.snackBar.open("Track already added to cart!", 'Close', {
        duration: 1000
      });
    }
  }
}
