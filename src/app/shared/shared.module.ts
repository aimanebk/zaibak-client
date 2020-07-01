import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ControlMessagesComponent } from './control-messages/control-messages.component';
import { RegisterRoutingModule } from '../register/register-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [
    ControlMessagesComponent,
    NotFoundComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(), // ToastrModule added
    RouterModule
  ],
  exports : [
    ControlMessagesComponent,
    LoadingComponent,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule,
    RouterModule
  ]
})
export class SharedModule { }
