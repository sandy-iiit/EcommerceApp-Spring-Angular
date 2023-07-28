import {Product} from "./product";

export class CartItem {

  id:number;
  name:string;
  imageUrl:string;
  unitPrice:number;
  quantity:number;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.imageUrl = product.imageUrl;
    this.unitPrice = product.unitPrice;
    this.quantity = 1;
  }

  // constructor(id: number, name: string, imageUrl: string, unitPrice: number, quantity: number) {
  //   this.id = id;
  //   this.name = name;
  //   this.imageUrl = imageUrl;
  //   this.unitPrice = unitPrice;
  //   this.quantity = 1;
  // }
}
