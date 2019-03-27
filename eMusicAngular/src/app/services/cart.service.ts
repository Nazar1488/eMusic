import { Injectable, OnInit } from '@angular/core';
import { Track } from '../models/track';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiUrl = "https://localhost:44370/api";
  cart: Track[];
  buyTracks: Track[];

  constructor(private http: HttpClient, private userService: UserService, private snackBar: MatSnackBar) {
    this.cart = [];
    this.buyTracks = [];
    this.http.get<Track[]>(`${this.apiUrl}/music/cart/?userId=${this.userService.currentUser.id}`).subscribe(tracks => {
        this.cart = tracks;
    })
    this.http.get<Track[]>(`${this.apiUrl}/music/myTracks/?userId=${this.userService.currentUser.id}`).subscribe(tracks => {
      this.buyTracks = tracks;
  })
  }

  updateCart() {
    this.http.get<Track[]>(`${this.apiUrl}/music/cart/?userId=${this.userService.currentUser.id}`).subscribe(tracks => {
        this.cart = tracks; 
    })
  }

  updateBuyTracks() {
    this.http.get<Track[]>(`${this.apiUrl}/music/myTracks/?userId=${this.userService.currentUser.id}`).subscribe(tracks => {
      this.buyTracks = tracks;
  })
  }

  add(track: Track): boolean {
    if (this.cart.find(t => t.id == track.id) == null && this.buyTracks.find(t => t.id == track.id) == null ) {
      this.http.post<any>(`${this.apiUrl}/music/addToCart`, { userId: this.userService.currentUser.id, trackId: track.id }).subscribe(result => {
        this.updateCart();
      })
      return true;
    }
    return false;
  }

  buy(track: Track): boolean {
    if (this.cart.find(t => t.id == track.id) != null) {
      this.http.post<any>(`${this.apiUrl}/music/buy`, { userId: this.userService.currentUser.id, trackId: track.id }).subscribe(result => {
        if (result == null)
        {
          this.snackBar.open("You do not have enough money!", 'Close', {
            duration: 1000
          });
          return false;
        }
        this.userService.currentUser.balance = result.balance;
        var id = this.cart.findIndex(t => t.id == track.id);
        this.cart.splice(id, 1);
        this.updateCart();
        this.updateBuyTracks();
        this.snackBar.open("Track is now yours!", 'Close', {
          duration: 1000
        });
      })
      return true;
    }

    return false;
  }

  remove(track: Track) {
    var index = this.cart.findIndex(t => t.id == track.id);
    if (index > -1) {
      this.http.post<any>(`${this.apiUrl}/music/removeFromCart`, { userId: this.userService.currentUser.id, trackId: track.id }).subscribe(result => {
        this.updateCart();
      })
      return true;
    }
  }
}
