import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';


@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList:undefined | product[]; 
  productDelMsg:string | undefined;
  constructor(private product:ProductService) { }

  ngOnInit(): void {
    this.list();
  }

  deleteList(id:number){
    console.warn(id);
    this.product.deleteProduct(id).subscribe((result)=>{
      if(result){
       this.productDelMsg="This Product has been deleted";
       this.list();
      }setTimeout(()=> this.productDelMsg= undefined, 3000);
    })
  }

  list(){
    this.product.productList().subscribe((result)=>{
      console.warn(result);
      this.productList = result;
    })
  }

}
