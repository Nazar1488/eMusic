import { Component, OnInit } from '@angular/core';
import { CartService, MusicService } from 'src/app/services';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService, private musicService: MusicService) { }

  ngOnInit() {
    this.cartService.updateCart();
  }

}
