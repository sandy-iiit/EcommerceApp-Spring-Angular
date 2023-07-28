import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Product} from "../common/product";
import {ProductCategory} from "../common/product-category";
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl="http://localhost:3000/api/products"
  private categoryUrl="http://localhost:3000/api/product-category"


  constructor(private http:HttpClient) { }

    getProductsList(catId: number): Observable<Product[]>{

     const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${catId}`
      console.log(searchUrl)

    return this.http.get<GetResponseProducts>(searchUrl)
      .pipe(
        map(response=>response._embedded.products)
      )
  }
  getProductsListPaginate(thePage:number,thePageSize:number,catId: number): Observable<GetResponseProducts>{

     const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${catId}&page=${thePage}&size=${thePageSize}`
      console.log(searchUrl)

    return this.http.get<GetResponseProducts>(searchUrl)

  }

  getProductCategories() {

    return this.http.get<GetResponseProductCategories>(this.categoryUrl)
      .pipe(
        map(response=>response._embedded.productCategory)
      )
  }

  searchProducts(keyword: string):Observable<Product[]> {
    const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${keyword}`
    console.log(searchUrl)

    return this.http.get<GetResponseProducts>(searchUrl)
      .pipe(
        map(response=>response._embedded.products)
      )
  }

  searchProductsPaginate(thePage:number,thePageSize:number,theKeyWord: String): Observable<GetResponseProducts>{

    const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${theKeyWord}&page=${thePage}&size=${thePageSize}`
    console.log(searchUrl)

    return this.http.get<GetResponseProducts>(searchUrl)

  }

  getProduct(productId: number):Observable<Product> {
    const productUrl=`${this.baseUrl}/${productId}`
    return this.http.get<Product>(productUrl)
  }
}
interface GetResponseProducts {
  _embedded:{
    products:Product [];
  },
  page:{
    size:number,
    totalElements:number,
    totalPages:number,
    number:number
  }

}

interface GetResponseProductCategories {
  _embedded: {
    productCategory: ProductCategory [];
  }
}
