import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { signup } from '../data-type';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
  showLogin= true; 
  loginError:string ='';
  constructor(private seller:SellerService) { }

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  signup(data: signup){     
     this.seller.userSignup(data);
  }
  login(data:any){
    console.warn(data);
    this.seller.userLogin(data);
    this.seller.isSellerLoginError.subscribe((isError)=>{
     if(isError){
      this.loginError="Username and Password do not Match"; 
     }
    })
  }

  showSellerLogin(){
    this.showLogin= true 
  }
  showSellerSignup(){
    this.showLogin= false
  }

}
