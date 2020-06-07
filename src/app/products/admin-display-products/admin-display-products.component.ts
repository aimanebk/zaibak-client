import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RangeService } from 'src/app/core/services/range.service';
import { takeWhile } from 'rxjs/operators';
import { Range } from 'src/app/core/models/range';
import { ProductService } from 'src/app/core/services/product.service';
import { formatDate } from '@angular/common';

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


  constructor(private formBuilder : FormBuilder, private rangeService : RangeService,
              private productService : ProductService) { 
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
    .subscribe(data => {
      console.log(data);
    },
    error => {
      console.log(error)
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
    
    let query = this.setupSearchQuery();

    this.productService.getAdminProducts(query)
        .pipe(takeWhile(() => this.alive))
        .subscribe(data => {
          console.log(data);
        },
        error => {
          console.log(error)
        })
  }

  setupSearchQuery(){

    let query = {...this.SEARCH_FORM.value};
    
    if(query.date.length != 2 ||  query.date[0] == "" || query.date[1] == "" ){
      query.bDate = "";
      query.fDate = "";
    }else{
      query.bDate = formatDate(query.date[0], 'yyyy/MM/dd', 'en-US');
      query.fDate = formatDate(query.date[1], 'yyyy/MM/dd', 'en-US');
    }

    delete query.date;
    console.log(query);

    return query
  }

  ngOnDestroy(){
    this.alive = false;
  }

}
