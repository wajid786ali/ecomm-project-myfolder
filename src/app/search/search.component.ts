import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchProducts: undefined | product[];
  
  constructor(private product:ProductService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    let query = this.route.snapshot.paramMap.get('query');
    query && this.product.searchProduct(query).subscribe((result)=>{
      this.searchProducts = result;
    })

  }

}
