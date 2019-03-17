import { Injectable } from '@angular/core';
import { Track } from '../models/track';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Track[];

  constructor() {
    this.cart = [];
  }

  add(track: Track) {
    this.cart.push(track);
  }

  remove(track: Track) {
    var index = this.cart.findIndex(t => t.id == track.id);
    if (index > -1) {
      this.cart.splice(index, 1);
    }
  }
}
