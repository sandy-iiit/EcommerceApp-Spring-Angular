import { Component } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {ActivatedRoute} from "@angular/router";
import {CartServiceService} from "../../services/cart-service.service";
import {CartItem} from "../../common/cart-item";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  products: Product [] = [];
  catId: number = 0;
  catName: String = ''
  searchMode: boolean = false
  previousId: number = 1


  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 1;

  previousKeyword: String = ''

  constructor(private productService: ProductService, private route: ActivatedRoute,private cartService:CartServiceService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();

    })
  }


  public listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword')
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts()
    }


  }

  private handleListProducts() {
    const hasCatId: boolean = this.route.snapshot.paramMap.has('id')
    if (hasCatId) {
      this.catId = +this.route.snapshot.paramMap.get('id')!
      this.catName = this.route.snapshot.paramMap.get('name')!
    } else {
      this.catId = 1
    }

    if (this.previousId != this.catId) {
      this.thePageNumber = 1;
    }
    this.previousId = this.catId

    this.productService.getProductsListPaginate(this.thePageNumber - 1, this.thePageSize, this.catId).subscribe(
      this.processResults()
    )
  }

  private handleSearchProducts() {

    const keyword = this.route.snapshot.paramMap.get('keyword')!;

    if (this.previousKeyword != keyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = keyword

    this.productService.searchProductsPaginate(this.thePageNumber - 1, this.thePageSize, keyword)
      .subscribe(this.processResults())
  }


  private processResults() {
    return (data:any)=>{
      this.products=data._embedded.products;
      this.thePageSize=data.page.size;
      this.thePageNumber=data.page.number+1;
      this.theTotalElements=data.page.totalElements;
  }
}

  updatePageSize(value: string) {
    this.thePageSize= +value;
    this.thePageNumber=1;
    this.listProducts()
  }

  addToCart(product: Product) {
    console.log(product.description)
    const cartItem=new CartItem(product);

    this.cartService.addToCart(cartItem)
  }


}
