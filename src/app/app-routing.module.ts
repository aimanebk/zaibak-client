import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { AuthGuard } from './core/helpers/auth.guard';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { AddSupplierComponent } from './suppliers/add-supplier/add-supplier.component';
import { AdminDisplayProductsComponent } from './products/admin-display-products/admin-display-products.component';
import { AdminDetailsProductComponent } from './products/admin-details-product/admin-details-product.component';
import { AdminUpdateProductComponent } from './products/admin-update-product/admin-update-product.component';
import { ProductValueComponent } from './reports/product-value/product-value.component';
import { TradesListComponent } from './trades/trades-list/trades-list.component';
import { Role } from './core/models/role';
import { MainComponent } from './main/main.component';
import { StorekeeperDisplayProductsComponent } from './products/storekeeper/storekeeper-display-products/storekeeper-display-products.component';
import { StorekeeperDetailsProductComponent } from './products/storekeeper/storekeeper-details-product/storekeeper-details-product.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
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
        ]
      },
      {
        path : 'storekeeper',
        data: { roles: [Role.User, Role.Admin] },
        children : [
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
        ]
      }
    ]
  },


  // otherwise redirect to home
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
