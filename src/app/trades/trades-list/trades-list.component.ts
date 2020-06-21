import { Component, OnInit, OnDestroy } from '@angular/core';
import { LogsService } from 'src/app/core/services/logs.service';
import { takeWhile } from 'rxjs/operators';
import { Trade } from 'src/app/core/models/trade';
import { Module, GridOptions } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ToastrService } from 'ngx-toastr';
import { formatDate, DatePipe } from '@angular/common';

@Component({
  selector: 'app-trades-list',
  templateUrl: './trades-list.component.html',
  styleUrls: ['./trades-list.component.scss']
})
export class TradesListComponent implements OnInit, OnDestroy {
  alive : boolean = true
  modules: Module[] = [ClientSideRowModelModule];

  columnDefs = [
		{headerName: 'Date', valueGetter : params => {
      if(!params.data.date)
        return ''
      
      return this.datePipe.transform(params.data.date, 'dd-MM-yyyy HH:mm')
    } },
		{headerName: 'Code', field: 'code' },
		{headerName: 'Article', field: 'article'},
		{headerName: 'Utilisateur', field: 'username'},
    {headerName: `Quantité`, valueGetter: function(params) {
      if(!params.data.quantity)
        return 0;
      
      if(params.data.quantity < 0)
        return params.data.quantity * -1 

      return params.data.quantity;
    }},
		{headerName: 'Montant', field: 'price'},
		{headerName: 'Description', valueGetter: function(params) {
      if(!params.data.description)
        return '';
      
      if(params.data.description == 'Sell')
        return 'Vendre'

      if(params.data.description == 'Return')
        return 'Avoir'

      return params.data.description;
    }},

	];

	rowData : Trade[] = [];
  
  defaultColDef = {
    flex: 1,
    minWidth: 150,
    sortable: true,
    resizable: true,
    filter: true,
    floatingFilter: true,
  };

  gridOptions : GridOptions = {
    rowStyle : { 'font-weight': 'normal' },
    rowClassRules : {
      'return--style': function(params) { return params.data.price < 0; },
      'sell--style': function(params) { return params.data.price >= 0; },
    }
  };
  

  constructor(private tradeService : LogsService, private toastr : ToastrService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
   this.getTrades();
  }


  getTrades(){
    this.tradeService.getTradesLog()
      .pipe(takeWhile(() => this.alive))
      .subscribe((result : Trade[]) => {
        this.rowData = result ;
      },error => {
        this.showError(error)
      });
  }

  showError(errorMessage){
    this.toastr.error(errorMessage, "Erreur");
  }

  ngOnDestroy(){
    this.alive = false;
  }
}
