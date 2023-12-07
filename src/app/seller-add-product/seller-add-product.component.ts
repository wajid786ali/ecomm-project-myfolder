import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  addProductMsg:string | undefined; 
  constructor(private product:ProductService) { }

  ngOnInit(): void {
  }

  addPro(data:product){
    console.warn(data);
    this.product.sellerAddProduct(data).subscribe((result)=>{
     console.warn(result);
     if(result){
       this.addProductMsg ="Product has been succesfully";
     }setTimeout(()=> this.addProductMsg= undefined, 3000);
    })
  }

}
