import { Component } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {CartServiceService} from "../../services/cart-service.service";

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent {

  totalPrice:number=0.00
  totalQuantity:number=0
  constructor(private cartService:CartServiceService) {
  }

  ngOnInit(){
    this.updateCart();
  }

  private updateCart() {
    this.cartService.totalPrice.subscribe(data=>{
      this.totalPrice=data
    })
    this.cartService.totalQuantity.subscribe(data=>{
      this.totalQuantity=data
    })

  }
}
