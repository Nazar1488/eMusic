import { Component, OnInit } from '@angular/core';
import { CartService, MusicService } from 'src/app/services';

@Component({
  selector: 'app-my-music',
  templateUrl: './my-music.component.html',
  styleUrls: ['./my-music.component.css']
})
export class MyMusicComponent implements OnInit {

  constructor(private cartService: CartService,  private musicService: MusicService) { }

  ngOnInit() {
    this.cartService.updateBuyTracks();
  }

}
