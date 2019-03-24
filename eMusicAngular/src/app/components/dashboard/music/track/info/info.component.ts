import { Component, OnInit, Input } from '@angular/core';
import { Track } from 'src/app/models/track';
import { MusicService, CartService } from 'src/app/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

declare var window: any;

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})

export class InfoComponent implements OnInit {

  track: Track;
  apiUrl = "https://localhost:44370/api";
  
  constructor(private musicService: MusicService, private cartService: CartService, private snackBar: MatSnackBar, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    window.FB.XFBML.parse();
    this.route.params.subscribe(params => 
      this.track = this.musicService.availableTracks.find(t => t.id == params['id']))
  }

  getTrackImage() : string {
    return `${this.apiUrl}/music/image/?id=${this.track.id}`;
  }

  playTrack() {
    this.musicService.playTrack(this.track.id);
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