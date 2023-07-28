import { Component } from '@angular/core';
import {Product} from "../../common/product";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {CartServiceService} from "../../services/cart-service.service";
import {CartItem} from "../../common/cart-item";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  product!:Product;

  constructor(private productService:ProductService,private route:ActivatedRoute,private cartService:CartServiceService) {
  }

  ngOnInit(){
    this.route.paramMap.subscribe(()=>{
      this.handleProductDetails();
    })
  }

  private handleProductDetails() {
    const productId:number= +this.route.snapshot.paramMap.get('id')!

    this.productService.getProduct(productId).subscribe(data=>{
      this.product=data;
    })
  }

  addToCart() {
        const cartItem=new CartItem(this.product)
        this.cartService.addToCart(cartItem);
  }
}
