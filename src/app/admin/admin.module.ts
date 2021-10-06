import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AddProductComponent } from './products/add-product/add-product.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { AddSupplierComponent } from './suppliers/add-supplier/add-supplier.component';
import { AdminDisplayProductsComponent } from './products/admin-display-products/admin-display-products.component';
import { AdminDetailsProductComponent } from './products/admin-details-product/admin-details-product.component';
import { ProductPurchaseComponent } from './products/admin-details-product/product-purchase/product-purchase.component';
import { AdminUpdateProductComponent } from './products/admin-update-product/admin-update-product.component';
import { AdminReturnProductComponent } from './products/admin-return-product/admin-return-product.component';
import { AdminPurchaseProductComponent } from './products/admin-purchase-product/admin-purchase-product.component';
import { ProductValueComponent } from './reports/product-value/product-value.component';
import { SearchQueryComponent } from './products/admin-display-products/search-query/search-query.component';
import { TradesListComponent } from './trades/trades-list/trades-list.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../shared/components/components.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AgGridModule } from '@ag-grid-community/angular';
import { DeleteProductComponent } from './products/delete-product/delete-product.component';


@NgModule({
  declarations: [
    AddProductComponent,
    AddCategoryComponent,
    AddSupplierComponent,
    AdminDisplayProductsComponent,
    AdminDetailsProductComponent,
    ProductPurchaseComponent,
    AdminUpdateProductComponent,
    AdminReturnProductComponent,
    AdminPurchaseProductComponent,
    ProductValueComponent,
    SearchQueryComponent,
    TradesListComponent,
    InvoiceComponent,
    DeleteProductComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ComponentsModule,
    BsDatepickerModule.forRoot(),
    AgGridModule.withComponents([]),
  ],
  providers : [
    DatePipe,
  ]
})
export class AdminModule { }
