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


@Component({
  selector: 'app-admin-display-products',
  templateUrl: './admin-display-products.component.html',
  styleUrls: ['./admin-display-products.component.scss']
})
export class AdminDisplayProductsComponent implements OnInit{

  alive : boolean = true;
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


  constructor(private productService : ProductService, private toastr : ToastrService,
              private router : Router, private ngZone : NgZone) {  }

  ngOnInit(): void {
    this.getProducts();
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

  getFiltredProduct($event){
    this.rowData = $event;
  }

  onRowClicked($event){
    console.log($event);
    this.ngZone.run(() => this.router.navigate(['admin/product', $event.data._id]));
  }

  showError(errorMessage){
    this.toastr.error(errorMessage, "Erreur");
  }

  ngOnDestroy(){
    this.alive = false;
  }

}
