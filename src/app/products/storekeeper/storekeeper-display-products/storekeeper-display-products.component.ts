import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { takeWhile } from 'rxjs/operators';
import { Product } from 'src/app/core/models/product';
import { Module } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

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

  constructor(private productService : ProductService) { }

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
    console.log($event);
  }

  ngOnDestroy(){
    this.alive = false;
  }



}
