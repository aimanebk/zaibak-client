import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/core/services/product.service';
import { takeWhile } from 'rxjs/operators';
import { SellerProduct } from 'src/app/core/models/sellerProduct';
import { RangeService } from 'src/app/core/services/range.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnDestroy {
  PRODUCT_FORM = this.formBuilder.group({
    code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    article: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    type: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    sellingPrice: ['', [Validators.required]],
    discount: [''],
    equivalents: [''],
    notes: [''],
  });
  
  alive : boolean = true;
  products : SellerProduct[] = [];
  ranges : Range[] = [];


  constructor(private formBuilder : FormBuilder, private productService : ProductService,
              private rangeService : RangeService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getRanges();
  }

  getProducts(){
    this.productService.getSellerProduct()
      .pipe(takeWhile(() => this.alive))
      .subscribe((products : SellerProduct[]) => {
        this.products = products;
      }, error => {
        console.log(error);
      })
  }

  getRanges(){
    this.rangeService.getRanges()
      .pipe(takeWhile(() => this.alive))
      .subscribe((ranges : Range[]) => {
        this.ranges = ranges;
      }, error => {
        console.log(error);
      })
  }

  submit(){
    console.log(this.PRODUCT_FORM.value);
  }

  ngOnDestroy(){
    this.alive = false
  }

}
