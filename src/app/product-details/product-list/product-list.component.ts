import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../../new-services/common.service';
import { Product } from '../../products/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() product:Product;
  
showMessage :boolean=false;
  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.initialization();
  }
  initialization(){
  this.commonService.getProductMessage().subscribe(data => {
    this.showMessage = data;
    setTimeout(()=>{
      this.showMessage=false;
    },5000)
  })
  }
}
