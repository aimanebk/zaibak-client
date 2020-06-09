import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Purchase } from 'src/app/core/models/purchase';

@Component({
  selector: 'app-product-purchase',
  templateUrl: './product-purchase.component.html',
  styleUrls: ['./product-purchase.component.scss']
})
export class ProductPurchaseComponent implements OnInit, OnChanges {
  @Input() purchases : [ Purchase ];
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    console.log(this.purchases);
  }

}
