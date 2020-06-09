import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { AuthGuard } from './core/helpers/auth.guard';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { AddSupplierComponent } from './suppliers/add-supplier/add-supplier.component';
import { AdminDisplayProductsComponent } from './products/admin-display-products/admin-display-products.component';
import { DetailsProductComponent } from './products/details-product/details-product.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path : 'admin/product/add' , component : AddProductComponent, canActivate : [AuthGuard]},
  { path : 'admin/category/add' , component : AddCategoryComponent, canActivate : [AuthGuard]},
  { path : 'admin/supplier/add' , component : AddSupplierComponent, canActivate : [AuthGuard]},
  { path : 'admin/product' , component : AdminDisplayProductsComponent, canActivate : [AuthGuard]},
  { path : 'admin/product/:id' , component : DetailsProductComponent, canActivate : [AuthGuard]},


  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
