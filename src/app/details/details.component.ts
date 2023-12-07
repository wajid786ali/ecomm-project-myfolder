import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product, cart } from '../data-type';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  productData:undefined | product;
  productQuantity:number = 1;
  removeCart=false;
  cartData:product | undefined;
  constructor(private route:ActivatedRoute, private product:ProductService) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('productId');
    productId && this.product.sellerProList(productId).subscribe((result)=>{
      this.productData = result;
    
      let cartData = localStorage.getItem('localCart');
      if(productId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item:product) => productId== item.id.toString());
        if(items.length){
          this.removeCart=true;
        }else{
          this.removeCart=false;
        }
      }
      let user = localStorage.getItem('user');
      if(user){
        let userId= user && JSON.parse(user).id;
        this.product.getCartList(userId);
        this.product.cartData.subscribe((result)=>{
          let item = result.filter((item:product)=>productId?.toString() === item.productId?.toString());
          if(item.length){
            this.cartData = item[0];
            this.removeCart=true;
          }          
        });
      }    
       
    })

  }

  handleQuantity(val:string){
   if(this.productQuantity < 20 && val==='plus'){
     this.productQuantity+=1;
   }else if(this.productQuantity > 1 && val ==='min'){
     this.productQuantity-=1;  
   }
  }

  addToCart(){
   if(this.productData){
    this.productData.quantity = this.productQuantity;
    if(!localStorage.getItem('user')){
     //console.warn(this.productData);
     this.product.localAddtoCart(this.productData);
     this.removeCart=true; 
    }else{
      //console.warn("user is logged in");
        let user = localStorage.getItem('user');
        let userId= user && JSON.parse(user).id;
        let cartData:cart={
         ...this.productData,
         userId,
         productId:this.productData.id
        }
        delete cartData.id
       //console.warn(cartData);
       this.product.addtocart(cartData).subscribe((result)=>{
         if(result){
          this.product.getCartList(userId);
          this.removeCart=true;
         }   
       })
      
    }  
   }   
  }
  removeToCart(productId:number){
    if(!localStorage.getItem('user')){ 
    this.product.localRemoveToCart(productId);    
   }else{
     console.warn(this.cartData);
     let user = localStorage.getItem('user');
     let userId= user && JSON.parse(user).id;
     this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result)=>{
       if(result){
         this.product.getCartList(userId);
       }
     })
   } 
   this.removeCart=false;
  }
}