import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType='default';
  sellerName=''; 
  searchSeggestion:undefined | product[];
  userName='';
  cartItems= 0;
  constructor(private route:Router, private product:ProductService) { }

  ngOnInit(): void {
    this.route.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller')&& val.url.includes('seller')){
          this.menuType='seller';
          if (localStorage.getItem('seller')) {
            let sellerStorage = localStorage.getItem('seller');
            let sellerData = sellerStorage && JSON.parse(sellerStorage)[0];            
            this.sellerName = sellerData.name; 
          } 
        }else if(localStorage.getItem('user')){
          let userStorage = localStorage.getItem('user');
          let userData = userStorage && JSON.parse(userStorage);
          this.userName = userData.name; 
          this.menuType = 'user';
          this.product.getCartList(userData.id); 
        }else{
          this.menuType='default'
        }        
      }
    })
    let cartData = localStorage.getItem('localCart');
    if(cartData){
       this.cartItems = JSON.parse(cartData).length
    }
    this.product.cartData.subscribe((item)=>{
      this.cartItems = item.length;
    })
  }
  
  logout(){
    localStorage.removeItem('seller');
    this.route.navigate(['seller'])
  }
   userLogout(){
     localStorage.removeItem('user');
     this.route.navigate(['user-auth']);
     this.product.cartData.emit([]);
   }

  searchProduct(query:KeyboardEvent){
    if(query){
    let element = query.target as HTMLInputElement;
    console.warn(element.value);
    this.product.searchProduct(element.value).subscribe((data)=>{
       if(data.length>5){
         data.length=5
       }
       this.searchSeggestion= data;
    })
  }
 }

 hideSearch(){
  this.searchSeggestion= undefined;
 }
 
 searchSubmit(val:string){
   console.warn(val);
   this.route.navigate([`search/${val}`])
 }

 redirectToLink(id:number){
   this.route.navigate(['/details/'+ id])
 }

}
