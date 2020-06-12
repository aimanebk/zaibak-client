import { Component, OnInit, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RangeService } from 'src/app/core/services/range.service';
import { takeWhile } from 'rxjs/operators';
import { Range } from 'src/app/core/models/range';
import { ProductService } from 'src/app/core/services/product.service';
import { formatDate } from '@angular/common';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Module } from '@ag-grid-community/core';
import { Product } from 'src/app/core/models/product';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';




declare var $: any;

@Component({
  selector: 'app-admin-display-products',
  templateUrl: './admin-display-products.component.html',
  styleUrls: ['./admin-display-products.component.scss']
})
export class AdminDisplayProductsComponent implements OnInit, AfterViewInit, OnDestroy{
  SEARCH_FORM = this.formBuilder.group({
    productCode: [''],
    category: [''],
    date : ['']
  });

  bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  maxDate = new Date();
  today = new Date();
  ranges : Range[] = [];
  alive : boolean = true;
  loading : boolean = false;
  modules: Module[] = [ClientSideRowModelModule];

  columnDefs = [
		{headerName: 'Code', field: 'code' },
		{headerName: 'Article', field: 'article'},
		{headerName: 'Gamme', field: 'type'},
		{headerName: `Prix d'achat`,  valueGetter: function(params) {
      return parseFloat(params.data.buyingPrice).toFixed(2);
    }},
		{headerName: 'Prix de vente', field: 'sellingPrice'},
		{headerName: 'Stock Initial',  valueGetter: function(params) {
      if(!params.data.stockI)
          return 0;
      return params.data.stockI.stock;
    }},
    {headerName: 'Q. Vendu', valueGetter: function(params) {
      return params.data.out * -1;
    }},
    {headerName: 'Stock Final', valueGetter: function(params) {
      if(!params.data.stockF)
          return 0;
      return params.data.stockF.stock;
    }},
	];

	rowData : Product[] = [];
  
  defaultColDef = {
    flex: 1,
    sortable: true,
    resizable: true,
    filter: true,
  };


  constructor(private formBuilder : FormBuilder, private rangeService : RangeService,
              private productService : ProductService, private toastr : ToastrService,
              private router : Router, private ngZone : NgZone) { 
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
  }

  ngOnInit(): void {
    this.getProducts();
    this.getRanges();
  }

  ngAfterViewInit() :void {
    setTimeout(() => {
      $('.selectpicker').selectpicker();      
    },100);
  }

  getProducts(){
    this.productService.getAdminProducts({})
    .pipe(takeWhile(() => this.alive))
    .subscribe((data : Product[]) => {
      this.rowData = data ;
    },
    error => {
      this.showError(error);
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

  search(){   
    this.loading = true;
    let query = this.setupSearchQuery();

    console.log(query)

    this.productService.getAdminProducts(query)
        .pipe(takeWhile(() => this.alive))
        .subscribe((data : Product[]) => {
          this.rowData = data ;
          this.loading = false;
          this.showSuccess('Opération effectué avec succès');
        },
        error => {
          this.loading = false
          this.showError(error)
        });
  }

  onRowClicked($event){
    console.log($event);
    this.ngZone.run(() => this.router.navigate(['admin/product', $event.data._id]));
  }

  setupSearchQuery(){
    let query = {...this.SEARCH_FORM.value};
    
    if(!query.date || query.date.length != 2 ||  query.date[0] == "" || query.date[1] == "" ){
      query.bDate = "";
      query.fDate = "";
    }else{
      query.bDate = formatDate(query.date[0], 'yyyy-MM-dd', 'en-US');
      query.fDate = formatDate(query.date[1], 'yyyy-MM-dd', 'en-US');
    }

    delete query.date;

    return query
  }

  showError(errorMessage){
    this.toastr.error(errorMessage, "Erreur");
  }

  showSuccess(message){
    this.toastr.success(message, "Success")
  }


  ngOnDestroy(){
    this.alive = false;
  }

}
