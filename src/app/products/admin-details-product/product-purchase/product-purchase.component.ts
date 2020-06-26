import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Purchase } from 'src/app/core/models/purchase';
import { Module, GridOptions } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product-purchase',
  templateUrl: './product-purchase.component.html',
  styleUrls: ['./product-purchase.component.scss']
})
export class ProductPurchaseComponent implements OnInit {
  @Input() purchases : [ Purchase ];

  modules: Module[] = [ClientSideRowModelModule];

  columnDefs = [
		{headerName: 'Date', valueGetter : params => {
      if(!params.data.date)
        return ''
      
      return this.datePipe.transform(params.data.date, 'dd-MM-yyyy')
    } },
		{headerName: 'Quantité', field: 'quantite' },
		{headerName: `Total prix`, field: 'price'},
		{headerName: 'Fournisseur', field: 'supplier'},
		{headerName: 'Ref.Facture', field: 'refInvoice'},
	];
  
  defaultColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    resizable: true,
    filter: true,
  };

  gridOptions : GridOptions = {
    domLayout : 'autoHeight',
    rowStyle : { 'font-weight': 'normal' }
  }

  constructor(private datePipe : DatePipe) { }

  ngOnInit(): void {
  }

}
