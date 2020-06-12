import { Component, OnInit, NgZone } from '@angular/core';
import { Module } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Product } from 'src/app/core/models/product';
import { ReportService } from 'src/app/core/services/report.service';
import { ToastrService } from 'ngx-toastr';
import { takeWhile } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-value',
  templateUrl: './product-value.component.html',
  styleUrls: ['./product-value.component.scss']
})
export class ProductValueComponent implements OnInit {

  alive : boolean = true;
  modules: Module[] = [ClientSideRowModelModule];

  columnDefs = [
		{headerName: 'Code', field: 'code' },
		{headerName: 'Article', field: 'article'},
		{headerName: 'Gamme', field: 'type'},
		{headerName: `Valeur de départ`,  valueGetter: function(params) {
      if(!params.data.startValue)
      return 0;

      return parseFloat(params.data.startValue).toFixed(2);
    }},
		{headerName: `Valeur finale`,  valueGetter: function(params) {
      if(!params.data.endValue)
      return 0;

      return parseFloat(params.data.endValue).toFixed(2);
    }},
	];

	rowData : Product[] = [];
  
  defaultColDef = {
    flex: 1,
    sortable: true,
    resizable: true,
    filter: true,
  };


  constructor(private reportService : ReportService, private toastr : ToastrService,
              private router : Router, private ngZone : NgZone) {  }

  ngOnInit(): void {
    this.getProductsValue();
  }

  getProductsValue(){
    this.reportService.getProductsValueReport({})
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
