import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { appConstant } from '../app.constant';
import { ApiService } from '../new-services/api.service';
import { CommonService } from '../new-services/common.service';
import { Product } from '../products/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

product: Product | any = '';
id: number | String = '';
showMessage :boolean=false;
constructor(
  private activatedRoute: ActivatedRoute,
  private apiService: ApiService
) {}



ngOnInit(): void {
  this.activatedRoute.params.subscribe((data) => {
    this.getProduct((data as any).id);
  });
 // this.initialize();
}

//initialize(){
//  this.initializeForm();
//}



getProduct(id: number) {
  this.apiService
    .httpGet(`${appConstant.apiRoute.products}/${id}`)
    .subscribe((data) => {
      this.product = data;
      console.log(data);
    });
}
productUpdate(event: boolean){
  if (!(event as any).target){
    this.showMessage= event;
  }

  setTimeout(()=>{
  this.showMessage=false;
},5000)
}
}




