import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { User } from 'src/app/core/models/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { takeWhile } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-sell-product',
  templateUrl: './sell-product.component.html',
  styleUrls: ['./sell-product.component.scss']
})
export class SellProductComponent implements OnInit, OnChanges {
  @Input() discounts : [number];
  @Input() specialDiscount : number;
  @Input() productID : string;
  @Input() sellingPrice : number;

  quantity : number = 1;
  discount : number;
  prevQuantity  : number;
  prevDiscount : number;
  discountedSalePrice : number ;
  currentUser : User ;
  disabled : boolean = false;
  loading : boolean = false;
  alive : boolean = true;
  isGarageOwner : boolean = false;
  constructor(private authenticationService : AuthenticationService, private toastr : ToastrService,
              private productService : ProductService) { }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnChanges(){
    this.discountedSalePrice = this.sellingPrice;
    setTimeout(() => {
      $('.selectpicker').selectpicker('refresh');
    },100);
  }


  calculatePrice($event){

    if(!this.quantity || this.quantity < 0 || typeof(this.quantity) != 'number'){
      this.discountedSalePrice = 0;
      this.prevQuantity = 0;
      this.disabled = true;
      return 0;
    }
    this.disabled = false;
    if(this.prevQuantity == this.quantity && this.prevDiscount == this.discount)
      return 0;
    
    this.prevQuantity = this.quantity;
    this.prevDiscount = this.discount;

    if(!this.discount)
      this.discount = 0
    
    let totalPrice = this.quantity * this.sellingPrice;

    this.discountedSalePrice = Math.ceil(totalPrice - totalPrice * (this.discount / 100));
  }

  submit(){
    if(!this.productID && !this.currentUser && !this.currentUser.username)
      return this.showError('Une erreur est survenue veuillez réessayer ultérieurement');
    
    if(!this.quantity || this.quantity < 1 || typeof(this.quantity) != 'number')
      return this.showError('La quantité doit être un nombre positif et supérieur à 1');

    if(!this.discountedSalePrice || this.discountedSalePrice <= 0 || typeof(this.discountedSalePrice) != 'number')
      return this.showError('Le prix doit être un nombre positif et supérieur à 0');

    this.loading = true;
    let payload = {
      username :this.currentUser.username,
      quantity : this.quantity,
      price : this.discountedSalePrice
    }
    this.productService.sellProduct(this.productID, payload)
      .pipe(takeWhile(() => this.alive))
      .subscribe(data => {
        this.showSuccess("Opération effectué avec succès");
        this.loading = false;
        $('#sellProduct').modal('hide');
      },error => {
        this.showError(error);
        this.loading = false;
      })
    
  }

  updateSelect($event){
    setTimeout(() => {
      $('.selectpicker').selectpicker('refresh');
    },100);
  }

  ngOnDestroy(){
    this.alive = false
  }

  showError(errorMessage){
    this.toastr.error(errorMessage, "Erreur");
  }

  showSuccess(message){
    this.toastr.success(message, "Success")
  }
}
