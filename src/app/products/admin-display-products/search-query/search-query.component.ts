import { Component, OnInit, AfterViewInit, OnDestroy, Output, EventEmitter, Input  } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RangeService } from 'src/app/core/services/range.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/core/services/product.service';
import { takeWhile } from 'rxjs/operators';
import { Range } from 'src/app/core/models/range';
import { Product } from 'src/app/core/models/product';
import { formatDate } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-search-query',
  templateUrl: './search-query.component.html',
  styleUrls: ['./search-query.component.scss']
})
export class SearchQueryComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() searchType : string;
  @Output() FiltredProducts = new EventEmitter<Product[]>();

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

  constructor(private formBuilder : FormBuilder, private rangeService : RangeService,
              private productService : ProductService, private toastr : ToastrService,) { 
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
  }

  ngOnInit(): void {
    this.getRanges();
  }

  ngAfterViewInit() :void {
    setTimeout(() => {
      $('.selectpicker').selectpicker();      
    },100);
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
    if(this.searchType && this.searchType == 'products')
      this.getProducts(query)
  }

  getProducts(query){
    this.productService.getAdminProducts(query)
    .pipe(takeWhile(() => this.alive))
    .subscribe((data : Product[]) => {
      this.FiltredProducts.emit(data);
      this.loading = false;
      this.showSuccess('Opération effectué avec succès');
    },
    error => {
      this.loading = false
      this.showError(error)
    });
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
