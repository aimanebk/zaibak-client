import { Component, OnInit, NgZone } from '@angular/core';
import { Module, GridOptions } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Product } from 'src/app/core/models/product';
import { ReportService } from 'src/app/core/services/report.service';
import { ToastrService } from 'ngx-toastr';
import { takeWhile } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-value',
  templateUrl: './product-value.component.html',
  styleUrls: ['./product-value.component.scss']
})
export class ProductValueComponent implements OnInit {

  alive : boolean = true;
  loading : boolean = false;
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
    minWidth: 150,
    sortable: true,
    resizable: true,
    filter: true,
    floatingFilter: true,
  };

  gridOptions : GridOptions = {
    rowStyle : { 'font-weight': 'normal' }
  };

  queryParams ;

  constructor(private reportService : ReportService, private toastr : ToastrService,
              private router : Router, private ngZone : NgZone, private activatedRoute : ActivatedRoute) {  }

  ngOnInit(): void {
    //LISTEN TO ROUTE QUERY PARAMS CHANGE
    this.activatedRoute.queryParams
    .pipe(takeWhile(() => this.alive))
    .subscribe(query => {
      this.queryParams = query;
      this.getProductsValue(query);
    });
  }

  getProductsValue(query){
    this.loading = true;
    this.reportService.getProductsValueReport(query)
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
