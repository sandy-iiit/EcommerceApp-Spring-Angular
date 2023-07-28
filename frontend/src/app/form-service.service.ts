import { Injectable } from '@angular/core';
import {map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Country} from "./common/country";
import {State} from "./common/state";

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  private countriesUrl="http://localhost:3000/api/countries"
  private statesUrl="http://localhost:3000/api/states"

  constructor(private http:HttpClient) { }

  getCountries():Observable<Country[]>{

    return this.http.get<GetResponseCountries>(this.countriesUrl)
      .pipe(map(res=>res._embedded.countries))
  }

  getStates(code:String):Observable<State[]>{
    const url=`${this.statesUrl}/search/findByCountryCode?code=${code}`
    return this.http.get<GetResponseStates>(url).pipe(
      map(res=>res._embedded.states)
    )
  }

  getCreditCardMonths(startMonth:number):Observable<number[]>{

    let data:number[]=[]

    for(let month=startMonth;month<=12;month++){
      data.push(month)
    }

    return of(data)

  }
  getCreditCardYears():Observable<number[]>{

    let data:number[]=[]
    const startYear=new Date().getFullYear()
    const endYear = startYear+10

    for(let year=startYear;year<=endYear;year++){
      data.push(year)
    }

    return of(data)
  }


}
interface GetResponseCountries{
  _embedded:{
    countries:Country[]
  }
}
interface GetResponseStates{
  _embedded:{
    states:State[]
  }
}
