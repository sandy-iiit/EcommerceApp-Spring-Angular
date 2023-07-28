import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CartServiceService} from "../../services/cart-service.service";
import {FormServiceService} from "../../form-service.service";
import {Country} from "../../common/country";
import {State} from "../../common/state";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  checkoutFormGroup!:FormGroup

  countries!:Country[]
  shippingStates!:State[]
  billingStates!:State[]

  totalPrice:number=0
  totalQuantity:number=0
  creditcardYears!:number[]
  creditcardMonths!:number[]
  constructor(private formBuilder:FormBuilder,private cartService:CartServiceService
  ,private formService:FormServiceService) {
  }

  ngOnInit(){
    this.cartService.totalQuantity.subscribe(data=>{
      this.totalQuantity=data
    })
    this.cartService.totalPrice.subscribe(data=>{
      this.totalPrice=data
    })
    this.checkoutFormGroup =this.formBuilder.group({
      customer:this.formBuilder.group({
        firstName:new FormControl('',[Validators.required,Validators.minLength(2)]),
        lastName:new FormControl('',[Validators.required,Validators.minLength(2)]),
        email:new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      }),
      shippingAddress:this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:[''],
      }),
      billingAddress:this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:[''],
      }),
      creditCard:this.formBuilder.group({
        cardType:[''],
        nameOnCard:[''],
        cardNumber:[''],
        securityCode:[''],
        expirationMonth:[''],
        expirationYear:[''],
      }),


    })

    const startMonth:number=new Date().getMonth()+1
    this.formService.getCreditCardMonths(startMonth).subscribe(data=>{
      this.creditcardMonths=data
    })
    this.formService.getCreditCardYears().subscribe(data=>{
      this.creditcardYears=data
    })

    this.formService.getCountries().subscribe(data=>this.countries=data)

  }

  onSubmit() {
    console.log('Handling form')
    console.log(this.checkoutFormGroup.get('customer')?.value)
  }
 getFirstName(){
    return this.checkoutFormGroup.get('customer.firstName')
 }
 getLastName(){
    return this.checkoutFormGroup.get('customer.lastName')
 }
 getEmail(){
    return this.checkoutFormGroup.get('customer.email')
 }
  copyShippingAddress(event:Event) {

    if(event.target instanceof HTMLInputElement){
      if(event.target.checked){
        this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value)
        this.billingStates=this.shippingStates
     }
      else{
        this.checkoutFormGroup.controls['billingAddress'].reset()
        this.billingStates=[]
      }
    }

  }

  handleMonths() {

    const creditCardFormGroup=this.checkoutFormGroup.get('creditCard')
    const currentYear:number=new Date().getFullYear()
    const selectedYear:number= Number(creditCardFormGroup?.value['expirationYear'])
    let startMonth!:number
    if(currentYear===selectedYear){
      startMonth=new Date().getMonth()+1
    }
    else{
      startMonth=1
    }

    this.formService.getCreditCardMonths(startMonth).subscribe(data=>
      this.creditcardMonths=data
    )
  }

  getStates(formgroupname: string) {

    const formgroup=this.checkoutFormGroup.get(formgroupname)

    const countryCode=formgroup?.value['country'].code
    const countryName=formgroup?.value['country'].name

    this.formService.getStates(countryCode).subscribe(data=> {
      if(formgroupname==='shippingAddress'){
        this.shippingStates = data
      }
      else{
        this.billingStates=data
      }

    })
  }
}
