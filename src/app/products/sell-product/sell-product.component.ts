import { Component, OnInit, Input, OnChanges } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-sell-product',
  templateUrl: './sell-product.component.html',
  styleUrls: ['./sell-product.component.scss']
})
export class SellProductComponent implements OnInit, OnChanges {
  @Input() discounts : [number];
  @Input() productID : String;
  @Input() sellingPrice : number;

  quantity : number = 1;
  discount : number;
  prevQuantity  : number;
  prevDiscount : number;
  discountedSalePrice : number ;
  disabled : boolean = false;
  constructor() { }

  ngOnInit(): void {
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

}
