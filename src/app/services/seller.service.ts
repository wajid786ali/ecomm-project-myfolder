import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signup, login } from '../data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedin = new BehaviorSubject<boolean>(false);
  isSellerLoginError = new EventEmitter<boolean>(false);

  constructor(private http:HttpClient, private route:Router) { }

  userSignup(data:signup){
    this.http.post("http://localhost:3000/seller", data, {observe: 'response'})
    .subscribe((result)=>{
      console.warn(result);
      this.isSellerLoggedin.next(true);
      localStorage.setItem("seller", JSON.stringify(result.body));
      this.route.navigate(['seller-home']);
    })
  }

  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedin.next(true);
      this.route.navigate(['seller-home']);
    }
  }

  userLogin(data:login){
   return this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
    {observe:'response'}).subscribe((result:any)=>{
     if(result &&result.body &&result.body.length){ 
       localStorage.setItem('seller', JSON.stringify(result.body));
       this.route.navigate(['seller-home']);
     }else{
       console.warn('user not login');
       this.isSellerLoginError.emit(true);
     } 
    })
  }

}
