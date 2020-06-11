import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Product } from 'src/app/core/models/product';

@Component({
  selector: 'app-product-infos',
  templateUrl: './product-infos.component.html',
  styleUrls: ['./product-infos.component.scss']
})
export class ProductInfosComponent implements OnInit, OnChanges {
  @Input() product : Product
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    console.log(this.product);
  }

}
