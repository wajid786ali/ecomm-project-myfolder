import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  orderData:order[] | undefined;
  constructor(private product:ProductService) { }

  ngOnInit(): void {
    this.product.getOrderList().subscribe((result)=>{
      this.orderData = result
    })

  }

}
