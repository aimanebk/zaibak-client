import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductInfosComponent } from './product-infos/product-infos.component';
import { SellProductComponent } from './sell-product/sell-product.component';
import { FormsModule } from '@angular/forms';
import { OnlyPositivePipe } from '../pipes/only-positive.pipe';



@NgModule({
  declarations: [
    ProductInfosComponent,
    SellProductComponent,
    OnlyPositivePipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports : [
    ProductInfosComponent,
    SellProductComponent
  ]
})
export class ComponentsModule { }
