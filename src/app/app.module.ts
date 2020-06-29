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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './navbar/navbar.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AgGridModule } from '@ag-grid-community/angular';
import { DatePipe } from '@angular/common';
import { MainComponent } from './main/main.component';
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
    NavbarComponent,
    MainComponent,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
