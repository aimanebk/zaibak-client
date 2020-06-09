import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ControlMessagesComponent } from './shared/control-messages/control-messages.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APIInterceptor } from './core/interceptors/APIInterceptor';
import { RegisterComponent } from './register/register.component';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { AddProductComponent } from './products/add-product/add-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { AddSupplierComponent } from './suppliers/add-supplier/add-supplier.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminDisplayProductsComponent } from './products/admin-display-products/admin-display-products.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AgGridModule } from '@ag-grid-community/angular';
import { DetailsProductComponent } from './products/details-product/details-product.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ControlMessagesComponent,
    RegisterComponent,
    AddProductComponent,
    AddCategoryComponent,
    AddSupplierComponent,
    NavbarComponent,
    AdminDisplayProductsComponent,
    DetailsProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    BsDatepickerModule.forRoot(),
    AgGridModule.withComponents([])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
