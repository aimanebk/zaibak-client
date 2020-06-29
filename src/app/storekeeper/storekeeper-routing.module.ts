import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StorekeeperDisplayProductsComponent } from './storekeeper-display-products/storekeeper-display-products.component';
import { StorekeeperDetailsProductComponent } from './storekeeper-details-product/storekeeper-details-product.component';


const routes: Routes = [
  {
    path : 'product',
    children : [
      {
        path : '',
        component : StorekeeperDisplayProductsComponent
      },
      {
        path : ':id',
        component : StorekeeperDetailsProductComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StorekeeperRoutingModule { }
