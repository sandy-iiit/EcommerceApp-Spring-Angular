import {Component, TemplateRef, ViewChild} from '@angular/core';
import {CartItem} from "../../common/cart-item";
import {CartServiceService} from "../../services/cart-service.service";

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent {

  cartItems:CartItem []=[]
  totalPrice:number=0
  totalQuantity:number=0



  constructor(private cartService:CartServiceService) {
  }

  ngOnInit(){
    this.listCartDetails()
  }

  private listCartDetails() {
    this.cartItems=this.cartService.cartItems

    this.cartService.totalPrice.subscribe(data=>{
      this.totalPrice=data
    })

    this.cartService.totalQuantity.subscribe(data=>{
      this.totalQuantity=data
    })

    this.cartService.computeCartTotals()

  }

  increment(item: CartItem) {
    this.cartService.addToCart(item)
  }

  decrement(item: CartItem) {
    this.cartService.decrementQuantity(item)
  }

  remove(item: CartItem) {
    this.cartService.remove(item)
  }
}
