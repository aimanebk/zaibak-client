import { Component, OnInit, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RangeService } from 'src/app/core/services/range.service';
import { takeWhile } from 'rxjs/operators';
import { Range } from 'src/app/core/models/range';
import { ProductService } from 'src/app/core/services/product.service';
import { formatDate } from '@angular/common';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Module, GridOptions } from '@ag-grid-community/core';
import { Product } from 'src/app/core/models/product';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-admin-display-products',
  templateUrl: './admin-display-products.component.html',
  styleUrls: ['./admin-display-products.component.scss']
})
export class AdminDisplayProductsComponent implements OnInit{

  alive : boolean = true;
  loading : boolean = false;
  modules: Module[] = [ClientSideRowModelModule];

  columnDefs = [
		{headerName: 'CODE', field: 'code' },
		{headerName: 'ARTICLE', field: 'article'},
		{headerName: 'MARQUE', field: 'brand'},
		{headerName: 'GAMME', field: 'type'},
		{headerName: `PRIX D'ACHAT`,  valueGetter: function(params) {
      return parseFloat(params.data.buyingPrice).toFixed(2);
    }},
		{headerName: 'PRIX DE VENTE', field: 'sellingPrice'},
		{headerName: 'STOCK INITIAL',  valueGetter: function(params) {
      if(!params.data.stockI)
          return 0;
      return params.data.stockI.stock;
    }},
    {headerName: 'Q. VENDU', valueGetter: function(params) {
      return params.data.out * -1;
    }},
    {headerName: 'STOCK FINAL', valueGetter: function(params) {
      if(!params.data.stockF)
          return 0;
      return params.data.stockF.stock;
    }},
	];

	rowData : Product[] = [];
  
  defaultColDef = {
    flex: 1,
    minWidth: 150,
    sortable: true,
    resizable: true,
    filter: true,
    floatingFilter: true,
  };

  gridOptions : GridOptions = {
    rowStyle : { 'font-weight': 'normal', 'font-size' : '12px' },
    
};

  queryParams ;


  constructor(private productService : ProductService, private toastr : ToastrService,
              private router : Router, private ngZone : NgZone, private activatedRoute : ActivatedRoute) {  }

  ngOnInit(): void {
    //LISTEN TO ROUTE QUERY PARAMS CHANGE
    this.activatedRoute.queryParams
    .pipe(takeWhile(() => this.alive))
    .subscribe(query => {
      this.queryParams = query;
      this.getProducts(query);
    });
  }

  getProducts(query){
    this.loading = true;
    this.productService.getAdminProducts(query)
    .pipe(takeWhile(() => this.alive))
    .subscribe((data : Product[]) => {
      this.rowData = data ;
      this.showSuccess('Opération effectué avec succès');
      this.loading = false;
    },
    error => {
      this.showError(error);
      this.loading = false;
    })
  }

  onRowClicked($event){
    this.ngZone.run(() => this.router.navigate(['admin/product', $event.data._id], { queryParams: this.queryParams}));
  }

  showSuccess(message){
    this.toastr.success(message, "Success")
  }

  showError(errorMessage){
    this.toastr.error(errorMessage, "Erreur");
  }

  ngOnDestroy(){
    this.alive = false;
  }

}
