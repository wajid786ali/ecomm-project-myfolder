import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-update-seller-product',
  templateUrl: './update-seller-product.component.html',
  styleUrls: ['./update-seller-product.component.css']
})
export class UpdateSellerProductComponent implements OnInit {
  updateProMsg:undefined | product;
  successMsg:string | undefined;

  constructor(private route:ActivatedRoute, private product:ProductService) { }

  ngOnInit(): void {
     let productId = this.route.snapshot.paramMap.get('id');
     console.warn(productId);
     productId && this.product.sellerProList(productId).subscribe((result)=>{
       this.updateProMsg = result;
     })

  }

  updatePro(data:product){
    if(this.updateProMsg){
       data.id = this.updateProMsg.id
    }
    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        this.successMsg = "Product has been updated" 
      } 
    }),setTimeout(()=>{this.successMsg = undefined}, 3000)
    console.warn(data);
  }

}
