import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  payableAmount:number | undefined;
  constructor(private product:ProductService, private router:Router) { }

  ngOnInit(): void {
    this.product.cartList().subscribe((result)=>{     
       let price = 0;
       result.forEach((item) => {
       if (item.quantity) {
         price = price + (+item.price* +item.quantity); 
       } 
     });      
     this.payableAmount= price + (price/10)+100 - (price/10);
     console.warn(this.payableAmount);      
   });
  }

  orderNow(data:{email:string,address:string,contact:string}){
    let userStore = localStorage.getItem('user');
    let userId= userStore && JSON.parse(userStore).id;
     if(this.payableAmount){
        let orderData:order ={
        ...data,
        payableAmount:this.payableAmount,
        userId,
        id:undefined
      }
      this.product.orderNow(orderData).subscribe((result)=>{        
        alert('Product Data has been updated');
        this.router.navigate(['my-order']);
      })  
   };
    
  }

}
