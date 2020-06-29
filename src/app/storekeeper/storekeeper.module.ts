import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorekeeperRoutingModule } from './storekeeper-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AgGridModule } from '@ag-grid-community/angular';
import { ComponentsModule } from '../shared/components/components.module';
import { StorekeeperDetailsProductComponent } from './storekeeper-details-product/storekeeper-details-product.component';
import { StorekeeperDisplayProductsComponent } from './storekeeper-display-products/storekeeper-display-products.component';


@NgModule({
  declarations: [
    StorekeeperDetailsProductComponent,
    StorekeeperDisplayProductsComponent
  ],
  imports: [
    CommonModule,
    StorekeeperRoutingModule,
    AgGridModule.withComponents([]),
    SharedModule,
    ComponentsModule
  ]
})
export class StorekeeperModule { }
