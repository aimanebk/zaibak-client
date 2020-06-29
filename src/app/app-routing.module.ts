import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AddProductComponent } from './products/admin/add-product/add-product.component';
import { AuthGuard } from './core/helpers/auth.guard';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { AddSupplierComponent } from './suppliers/add-supplier/add-supplier.component';
import { AdminDisplayProductsComponent } from './products/admin/admin-display-products/admin-display-products.component';
import { AdminDetailsProductComponent } from './products/admin/admin-details-product/admin-details-product.component';
import { AdminUpdateProductComponent } from './products/admin/admin-update-product/admin-update-product.component';
import { ProductValueComponent } from './reports/product-value/product-value.component';
import { TradesListComponent } from './trades/trades-list/trades-list.component';
import { Role } from './core/models/role';
import { MainComponent } from './main/main.component';
import { InvoiceComponent } from './invoice/invoice.component';


const routes: Routes = [
  { path : 'login', loadChildren : () => import('./login/login.module').then(m => m.LoginModule )},
  { path: 'register', loadChildren : () => import('./register/register.module').then(m => m.RegisterModule )},
  { 
    path : '',
    canActivate : [AuthGuard],
    children : [
      {
        path : '',
        component : MainComponent
      },
      { 
        path : 'admin',
        data: { roles: [Role.Admin] },
        children : [
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
        ]
      },
      {
        path : 'storekeeper',
        data: { roles: [Role.User, Role.Admin] },
        loadChildren : () => import('./storekeeper/storekeeper.module').then(m => m.StorekeeperModule )
      },
    ]
  },


  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
