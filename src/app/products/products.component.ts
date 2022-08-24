import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ProductDataService } from '../services/product-data.service';
import { environment } from '../../environments/environment';
import { appConstant } from '../app.constant';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-product-list',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit,OnDestroy {
  products : Array<Product>;
  length:number ;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
 // priceModel:number;
 // pageIndex:number;
  pageEvent: PageEvent;

  constructor( private productService: ProductDataService,
               private http:HttpClient, private router: Router){ }


  ngOnInit(): void {
    this.getProducts(this.pageSize)
  }

  getProducts(limit?:number, skip?:number , filter?:string){
    let productApiUrl:string;
    if(limit && !skip){
      productApiUrl=`${environment.apiEndpoint}${appConstant.apiRoute.products}?limit=${limit}`
    }
    else if(skip && !limit){
      productApiUrl=`${environment.apiEndpoint}${appConstant.apiRoute.products}?skip=${skip}`
    }
    else if(limit && skip){
      productApiUrl=`${environment.apiEndpoint}${appConstant.apiRoute.products}?limit=${limit}&skip=${skip}`
    }
    else{
      productApiUrl=`${environment.apiEndpoint}${appConstant.apiRoute.products}`
    }
    
    this.http.get(productApiUrl).subscribe(data=>{
      this.products = (data as any).products;
      this.length = (data as any).total;
    })
  }
  
  goToProduct(event: any, product: any ): void {
    this.router.navigate(['/product-details', product.id])
  }

  onPagination(event:  PageEvent){
    this.pageEvent=event;
   // this.pageSize=event.pageSize;
   //this.pageIndex=event.pageIndex;
    let skip:number = event.pageSize * event.pageIndex;
   
    this.getProducts(event.pageSize, event.pageSize * event.pageIndex)
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
 /* priceChange(event:Event){
    if(this.pageIndex){
    this.getProducts(this.pageSize, this.pageSize * this.pageIndex, (event as any).target.value);
    }
    else{
      this.getProducts(this.pageSize, (event as any).target.value);
    }
  }*/

  ngOnDestroy(){

  }
}


