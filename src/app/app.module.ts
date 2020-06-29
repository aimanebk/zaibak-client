import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesComponent } from './shared/control-messages/control-messages.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APIInterceptor } from './core/interceptors/APIInterceptor';
import { RegisterComponent } from './register/register.component';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { AddProductComponent } from './products/admin/add-product/add-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { AddSupplierComponent } from './suppliers/add-supplier/add-supplier.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminDisplayProductsComponent } from './products/admin/admin-display-products/admin-display-products.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AgGridModule } from '@ag-grid-community/angular';
import { AdminDetailsProductComponent } from './products/admin/admin-details-product/admin-details-product.component';
import { ProductPurchaseComponent } from './products/admin/admin-details-product/product-purchase/product-purchase.component';
import { AdminUpdateProductComponent } from './products/admin/admin-update-product/admin-update-product.component';
import { AdminReturnProductComponent } from './products/admin/admin-return-product/admin-return-product.component';
import { AdminPurchaseProductComponent } from './products/admin/admin-purchase-product/admin-purchase-product.component';
import { ProductValueComponent } from './reports/product-value/product-value.component';
import { SearchQueryComponent } from './products/admin/admin-display-products/search-query/search-query.component';
import { TradesListComponent } from './trades/trades-list/trades-list.component';
import { DatePipe } from '@angular/common';
import { MainComponent } from './main/main.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { OnlyPositivePipe } from './shared/pipes/only-positive.pipe';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';
import { RegisterModule } from './register/register.module';
import { SellProductComponent } from './shared/components/sell-product/sell-product.component';
import { ProductInfosComponent } from './shared/components/product-infos/product-infos.component';
import { ComponentsModule } from './shared/components/components.module';


@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    AddCategoryComponent,
    AddSupplierComponent,
    NavbarComponent,
    AdminDisplayProductsComponent,
    AdminDetailsProductComponent,
    ProductPurchaseComponent,
    AdminUpdateProductComponent,
    AdminReturnProductComponent,
    AdminPurchaseProductComponent,
    ProductValueComponent,
    SearchQueryComponent,
    TradesListComponent,
    MainComponent,
    InvoiceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    AgGridModule.withComponents([]),
    BrowserAnimationsModule, // required animations module
    SharedModule,
    ComponentsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
