import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from '../../new-services/common.service';
import { appConstant } from '../../../app/app.constant';
import { ApiService } from '../../new-services/api.service';
import { Product } from '../../products/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: any;
  maxValue: number = 10;
 
  @Input() product:Product;
  @Output() submit: EventEmitter<boolean>=new EventEmitter(false);
  constructor(private commonService: CommonService,
              private apiService: ApiService ) { }

  get appConstant(){
    return appConstant;
  };

  ngOnInit(): void {
    console.log(this.product);
    if (this.product){
      this.initializeForm(this.product)
    }
  }

  initializeForm(product:any){
    this.productForm = this.commonService.createproductForm(product);
  }

  onSubmit(formValue: any, isValid: boolean){
   // console.log(formValue)
   if (isValid){
    this.apiService.httpPut(`${appConstant.apiRoute.products}/${this.product?.id}`,formValue)
    .subscribe(data=> {
      this.submit.emit(true);
      this.commonService.sendProductMessage(true);
    },(err)=>{
     // console.log(err);
    });
   }
  }

}
