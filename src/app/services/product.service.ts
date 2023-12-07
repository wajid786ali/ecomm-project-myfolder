import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { product, cart, order} from '../data-type';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData= new EventEmitter<product[] | []>();

  constructor(private http:HttpClient) { }

  sellerAddProduct(data:product){
    return this.http.post("http://localhost:3000/products", data);
  }

  productList(){
    return this.http.get<product[]>("http://localhost:3000/products");
  }

  deleteProduct(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }

  sellerProList(id:string){
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }
  
  updateProduct(product:product){
    return this.http.put<product>(`http://localhost:3000/products/${product.id}`, product);
  }
  
  featureProducts(){
    return this.http.get<product[]>("http://localhost:3000/products?_limit=3");
  }

  trendyProducts(){
    return this.http.get<product[]>("http://localhost:3000/products?_limit=8");
  }

  searchProduct(query:string){
   return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`)
  }

  localAddtoCart(data:product){
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart', JSON.stringify([data]));
    }else{
      cartData=JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData))
      this.cartData.emit(cartData);
    }
    
  }

  localRemoveToCart(productId:number){
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      let items:product[] = JSON.parse(cartData);
      items= items.filter((item:product)=>productId! == item.id);
      console.warn(items);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }  
  }

  addtocart(cartData:cart){
    return this.http.post("http://localhost:3000/cart", cartData);
  }

  getCartList(userId:number){
    return this.http.get<product[]>('http://localhost:3000/cart?userId='+ userId, 
    {observe:'response'}).subscribe((result)=>{
      //console.warn(result);
      if(result && result.body){
        this.cartData.emit(result.body);
      }      
    })
  }
  removeToCart(cartId:number){
    return this.http.delete('http://localhost:3000/cart/'+cartId);
  }
  cartList(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>('http://localhost:3000/cart?userId='+userData.id);
  }

  orderNow(data:order){
    return this.http.post<order>('http://localhost:3000/orders/', data);
  }

  getOrderList(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>('http://localhost:3000/orders?userId='+userData.id);
  }

}
