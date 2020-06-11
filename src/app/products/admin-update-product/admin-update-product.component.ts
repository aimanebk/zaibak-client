import { Component, OnInit, Input, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/core/models/product';
import { ProductService } from 'src/app/core/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { RangeService } from 'src/app/core/services/range.service';
import { takeWhile, map } from 'rxjs/operators';
import { Range } from 'src/app/core/models/range';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-admin-update-product',
  templateUrl: './admin-update-product.component.html',
  styleUrls: ['./admin-update-product.component.scss']
})
export class AdminUpdateProductComponent implements OnInit {
  state$: Observable<object>;

  UPDATE_FORM = this.formBuilder.group({
    article: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    type: ['', [Validators.required, Validators.maxLength(1)]],
    sellingPrice: ['', [Validators.required]],
    discount: [[]],
    equivalents: [],
    notes: [''],
  });

  alive : boolean = true;
  loading : boolean = false;
  products : Product[] = [];
  ranges : Range[] = [];
  discounts : number[]= [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
  productToUpdate : Product;
  currentProdId;

  constructor(private formBuilder : FormBuilder, private productService : ProductService,
              private rangeService : RangeService, private toastr: ToastrService,
              private activatedRoute: ActivatedRoute, private router : Router,
              private ngZone : NgZone) { }

  ngOnInit(): void {
    this.currentProdId = this.activatedRoute.snapshot.params['id'];

    this.getProducts();
    this.getRanges();

    this.state$ = this.activatedRoute.paramMap
    .pipe(map(() => window.history.state));

    this.state$
    .pipe(takeWhile(() => this.alive))
    .subscribe((data :any) => {
      if(data){
        //IF ADMIN NAVIGATE DIRICTLY TO THIS PAGE BY URL OR BY REFRESH WAY
        if(data.navigationId <= 1 || !data.product )
          this.getCurrentProduct(this.currentProdId);
        else
          this.fillUpdateForm(data.product);
      }else{
          //RETURN ADMIN TO HOME PAGE
          this.router.navigate(['/admin/product']);
      }    
    });
  }

  ngAfterViewInit() :void {
    setTimeout(() => {
      $('.selectpicker').selectpicker('refresh');
    },100);
  }

  getProducts(){
    this.productService.getSellerProduct()
      .pipe(takeWhile(() => this.alive))
      .subscribe((products : Product[]) => {
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

  getCurrentProduct(productID){

    this.productService.getStorekeeperOneProduct(productID)
        .pipe(takeWhile(() => this.alive))
        .subscribe((data : Product) => {
          if(!data)
            //RETURN ADMIN TO HOME PAGE
            this.ngZone.run(() => this.router.navigate(['/admin/product']));

            this.fillUpdateForm(data);
        }, error => {

        })
  }

  fillUpdateForm(product){
    this.UPDATE_FORM.get('article').setValue(product.article);
    this.UPDATE_FORM.get('type').setValue([product.type]);
    this.UPDATE_FORM.get('sellingPrice').setValue(product.sellingPrice);
    this.UPDATE_FORM.get('discount').setValue(product.discount);
    this.UPDATE_FORM.get('equivalents').setValue(product.equivalents);
    this.UPDATE_FORM.get('notes').setValue(product.notes); 
  }

  submit(){
    if(this.UPDATE_FORM.dirty && this.UPDATE_FORM.valid) {
      this.loading = true;
      this.UPDATE_FORM.value.type = this.UPDATE_FORM.value.type[0];
      this.productService.updateProduct(this.currentProdId, this.UPDATE_FORM.value)
        .pipe(takeWhile(() => this.alive))
        .subscribe((result : any) => {
          this.showSuccess("Opération effectué avec succès")
          this.loading = false;
        }, error => {
          this.showError(error);
          this.loading = false;
        })
    }
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
