import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductDetailsRoutingModule } from './product-details-routing.module'; 
import { ProductDetailsComponent } from './product-details.component';

import { SharedModule } from '../shared/shared/shared.module';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';


@NgModule({
  declarations: [
    ProductDetailsComponent,
    ProductFormComponent,
    ProductListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductDetailsRoutingModule,
    SharedModule
    
  ]
})

export class ProductDetailsModule {}