import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDisplayProductsComponent } from './products/admin-display-products/admin-display-products.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { AdminUpdateProductComponent } from './products/admin-update-product/admin-update-product.component';
import { AdminDetailsProductComponent } from './products/admin-details-product/admin-details-product.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { AddSupplierComponent } from './suppliers/add-supplier/add-supplier.component';
import { ProductValueComponent } from './reports/product-value/product-value.component';
import { TradesListComponent } from './trades/trades-list/trades-list.component';
import { InvoiceComponent } from './invoice/invoice.component';


const routes: Routes = [
  { 
    path : 'product',
    children : [
      {
        path : '',
        component : AdminDisplayProductsComponent,
      },
      { 
        path : 'add' ,
        component : AddProductComponent
      },
      { 
        path : 'update/:id' ,
        component : AdminUpdateProductComponent
      },
      { 
        path : ':id' ,
        component : AdminDetailsProductComponent
      },
    ],
  },
  { 
    path : 'category/add' ,
    component : AddCategoryComponent
  },
  { 
    path : 'supplier/add' ,
    component : AddSupplierComponent
  },
  { 
    path : 'report' ,
    component : ProductValueComponent
  },
  { 
    path : 'logs' ,
    component : TradesListComponent
  },
  { 
    path : 'invoice' ,
    component : InvoiceComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
