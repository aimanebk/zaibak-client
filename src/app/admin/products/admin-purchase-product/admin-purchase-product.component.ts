import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SupplierService } from 'src/app/core/services/supplier.service';
import { debounceTime, startWith, takeWhile, tap } from 'rxjs/operators';
import { Supplier } from 'src/app/core/models/supplier';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/core/services/product.service';
import { combineLatest } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-admin-purchase-product',
  templateUrl: './admin-purchase-product.component.html',
  styleUrls: ['./admin-purchase-product.component.scss']
})
export class AdminPurchaseProductComponent implements OnInit, OnChanges, OnDestroy {
  @Input() productID : string;
  unitPrice : number | string = 0;

  PURCHASE_FORM = this.formBuilder.group({
    quantite: [1, [Validators.required,Validators.min(1)]],
    supplier: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    refInvoice: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    price: ['', [Validators.required, Validators.min(0)]],
  });

  suppliers : Supplier[];

  alive : boolean = true;
  loading : boolean = false;
  constructor(private formBuilder : FormBuilder, private supplierService : SupplierService,
              private toastr : ToastrService, private productService : ProductService) { }

  ngOnInit(): void {
    this.getSuppliers();
    combineLatest([this.PURCHASE_FORM.get('quantite').valueChanges.pipe(startWith(1)), 
                  this.PURCHASE_FORM.get('price').valueChanges])
            .pipe(
              takeWhile(() => this.alive),
              debounceTime(500),
              tap(value => {
               this.unitPrice = value && value[0] ? (value[1]/value[0]).toFixed(2) : 0
              })
            )
            .subscribe();
  }

  ngOnChanges(){
    $('.selectpicker').selectpicker('refresh');
  }

  getSuppliers(){
    this.supplierService.getSuppliers()
        .pipe(takeWhile(() => this.alive))
        .subscribe((result : Supplier[]) => {
            this.suppliers = result;
            this.refreshSelect();
        },error => {
          console.log(error);
        });
  }

  submit(){ 
    if(!this.productID)
      return this.showError('Une erreur est survenue veuillez réessayer ultérieurement');

    if(this.PURCHASE_FORM.dirty && this.PURCHASE_FORM.valid) {
      this.loading = true;
      this.productService.purchaseProduct(this.productID, this.PURCHASE_FORM.value)
        .pipe(takeWhile(() => this.alive))
        .subscribe((result : any) => {
          this.showSuccess("Opération effectué avec succès")
          this.loading = false;
          $('#purchaseProduct').modal('hide');
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
