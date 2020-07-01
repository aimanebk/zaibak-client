import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/core/services/product.service';
import { takeWhile } from 'rxjs/operators';
import { SellerProduct } from 'src/app/core/models/sellerProduct';
import { RangeService } from 'src/app/core/services/range.service';
import { ToastrService } from 'ngx-toastr';
import { Range } from 'src/app/core/models/range';
import { Product } from 'src/app/core/models/product';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit,AfterViewInit, OnDestroy {
  PRODUCT_FORM = this.formBuilder.group({
    code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    article: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    type: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    sellingPrice: ['', [Validators.required]],
    discount: [[]],
    specialDiscount: [],
    equivalents: [[]],
    notes: [''],
  });
  
  alive : boolean = true;
  loading : boolean = false;
  products : Product[] = [];
  ranges : Range[] = [];
  discounts : Number[]= [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];


  constructor(private formBuilder : FormBuilder, private productService : ProductService,
              private rangeService : RangeService, private toastr: ToastrService,
              private router : Router) { }

  ngOnInit(): void {
    this.getProducts();
    this.getRanges();
  }

  ngAfterViewInit() :void {
    $('.selectpicker').selectpicker();      
  }

  getProducts(){
    this.productService.getSellerProduct()
      .pipe(takeWhile(() => this.alive))
      .subscribe((products : Product[]) => {
        this.products = products;
        this.refreshSelect();
      }, error => {
        console.log(error);
      })
  }

  getRanges(){
    this.rangeService.getRanges()
      .pipe(takeWhile(() => this.alive))
      .subscribe((ranges : Range[]) => {
        this.ranges = ranges;
        this.refreshSelect();
      }, error => {
        console.log(error);
      })
  }

  submit(){ 
    if(this.PRODUCT_FORM.dirty && this.PRODUCT_FORM.valid) {
      this.loading = true;
      this.productService.addProduct(this.PRODUCT_FORM.value)
        .pipe(takeWhile(() => this.alive))
        .subscribe((result : any) => {
          this.showSuccess("Opération effectué avec succès")
          this.loading = false;
          this.router.navigate(['/']);
        }, error => {
          this.showError(error);
          this.loading = false;
        })
    }
  }

  refreshSelect(){
    setTimeout(() => {
      $('.selectpicker').selectpicker('refresh');
    },150);
  }

  showError(errorMessage){
    this.toastr.error(errorMessage, "Erreur");
  }

  showSuccess(message){
    this.toastr.success(message, "Success")
  }

  ngOnDestroy(){
    this.alive = false
  }

}
