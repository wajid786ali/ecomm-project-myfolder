import { Component, OnInit } from '@angular/core';
import { signup, login, cart, product } from '../data-type';
import { UsersService } from '../services/users.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin= true;
  isLoggedMsg:string | undefined;

  constructor(private users:UsersService, private product:ProductService) { }

  ngOnInit(): void {
  }
  
  signup(data:signup){
    this.users.signup(data);
  }
  login(data:login){
   this.users.userLogin(data);
   this.users.isLoggedError.subscribe((isError)=>{
    if(isError){
     this.isLoggedMsg = "Email and Password not found";
    }else{
      this.localCartToRemoveCart();
    }setTimeout(()=>{this.isLoggedMsg= undefined}, 3000)
   })
  }

  showUserLogin(){
    this.showLogin = true
  }
  showUserSignup(){
    this.showLogin = false
  }

  localCartToRemoveCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
      if(data){
        let cartDataList:product[] = JSON.parse(data);        
        cartDataList.forEach((product:product, index) => {
         let cartData:cart={
            ...product,
            userId,
            productId:product.id
          }
          delete cartData.id;
          setTimeout(()=>{
            this.product.addtocart(cartData).subscribe((result)=>{
              if(result){
                alert("item stored in DB");
              }
            })
            if(cartDataList.length === index+1 ){
              localStorage.removeItem('localCart');
            }
          }, 3000);          
        });
      }
    setTimeout(()=>{  
     this.product.getCartList(userId); 
    });
  }

}
