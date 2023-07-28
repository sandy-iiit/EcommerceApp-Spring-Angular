import { Injectable } from '@angular/core';
import {CartItem} from "../common/cart-item";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  cartItems:CartItem[]=[]

  totalPrice:Subject<number>=new Subject<number>()
  totalQuantity:Subject<number>=new Subject<number>()

  constructor() { }

  addToCart(cartItem:CartItem){
    let alreadyExistsInCart:boolean=false;
    let existingCartItem:CartItem|undefined = undefined;

    if(this.cartItems.length>0){
      existingCartItem=this.cartItems.find(tempItem=>tempItem.id===cartItem.id)
      alreadyExistsInCart=(existingCartItem != undefined)

    }

    if(alreadyExistsInCart){
      if (existingCartItem instanceof CartItem) {
        existingCartItem.quantity++;
      }

    }
    else {
      this.cartItems.push(cartItem)
    }

    this.computeCartTotals();

  }

   computeCartTotals() {

    let totalPriceValue:number=0
    let totalQuantityValue:number=0

    for (let item of this.cartItems){
      totalPriceValue+=item.quantity*item.unitPrice;
      totalQuantityValue+=item.quantity
    }

    this.totalPrice.next(totalPriceValue)
    this.totalQuantity.next(totalQuantityValue)

    this.logCartDetails(totalPriceValue,totalQuantityValue)
  }

  private logCartDetails(totalPriceValue: number, totalQuantityValue: number) {

    console.log("Contents of the cart: ")
    for (let item of this.cartItems){
      const subtotal=item.quantity*item.unitPrice
      console.log('name:'+item.name+' price: '+item.unitPrice+' quantity: '+item.quantity
      +' subtotal '+subtotal)
    }
    console.log('Total: '+totalPriceValue.toFixed(2))
    console.log('Quantity: '+totalQuantityValue.toFixed(2))
    console.log('-------')
  }

  decrementQuantity(item: CartItem) {
    item.quantity--;
    if(item.quantity==0){
      this.remove(item);
    }
    else{
      this.computeCartTotals()
    }
  }

   remove(item: CartItem) {
    const idx=this.cartItems.findIndex(temp=>temp.id===item.id)

     if(idx>-1) {
       this.cartItems.splice(idx, 1)

       this.computeCartTotals()
     }

  }
}
