import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { takeWhile } from 'rxjs/operators';
import { Product } from 'src/app/core/models/product';
import { Module } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-storekeeper-display-products',
  templateUrl: './storekeeper-display-products.component.html',
  styleUrls: ['./storekeeper-display-products.component.scss']
})
export class StorekeeperDisplayProductsComponent implements OnInit, OnDestroy {
  alive : boolean = true ;

  modules: Module[] = [ClientSideRowModelModule];

  columnDefs = [
		{headerName: 'Code', field: 'code' },
		{headerName: 'Article', field: 'article'},
    {headerName: 'Gamme', field: 'type'},
    {headerName: 'Stock',  valueGetter: function(params) {
      if(!params.data.stock)
          return 0;
      return params.data.stock;
    }},
    {headerName: 'Prix', field: 'sellingPrice'},
    
    {headerName: 'Remise', valueGetter: function(params) {
      if(!params.data.discount)
          return 'Non';
      if(params.data.discount.length <= 0 )
        return 'Non';

      return 'Oui';
    }},
	];

	rowData : Product[] = [];
  
  defaultColDef = {
    flex: 1,
    sortable: true,
    resizable: true,
    filter: true,
    floatingFilter: true,

  };

  constructor(private productService : ProductService, private ngZone : NgZone,
              private router : Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getStorekeeperProducts()
      .pipe(takeWhile(() => this.alive))
      .subscribe((result : Product[]) => {
        this.rowData = result;
      },error => {
        console.log(error);
      });
  }

  onRowClicked($event){
    this.ngZone.run(() => this.router.navigate(['storekeeper/product', $event.data._id]));
  }

  ngOnDestroy(){
    this.alive = false;
  }



}