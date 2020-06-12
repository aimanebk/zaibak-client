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


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path : 'admin/product/add' , component : AddProductComponent, canActivate : [AuthGuard]},
  { path : 'admin/category/add' , component : AddCategoryComponent, canActivate : [AuthGuard]},
  { path : 'admin/supplier/add' , component : AddSupplierComponent, canActivate : [AuthGuard]},
  { path : 'admin/product' , component : AdminDisplayProductsComponent, canActivate : [AuthGuard]},
  { path : 'admin/product/update/:id' , component : AdminUpdateProductComponent, canActivate : [AuthGuard]},
  { path : 'admin/product/:id' , component : AdminDetailsProductComponent, canActivate : [AuthGuard]},
  { path : 'admin/report' , component : ProductValueComponent, canActivate : [AuthGuard]},
  { path : 'admin/logs' , component : TradesListComponent, canActivate : [AuthGuard]},


  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
