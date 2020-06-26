import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { takeWhile } from 'rxjs/operators';
import { Product } from 'src/app/core/models/product';
import { faShoppingCart, faCartPlus, faExchangeAlt, faPencilAlt  } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-admin-details-product',
  templateUrl: './admin-details-product.component.html',
  styleUrls: ['./admin-details-product.component.scss']
})
export class AdminDetailsProductComponent implements OnInit, OnDestroy {
  alive : boolean = true;
  product : Product;
  loading : boolean;

  SEARCH_FORM = this.formBuilder.group({
    date : ['']
  });

  bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  maxDate = new Date();
  today = new Date();

  faShoppingCart = faShoppingCart;
  faCartPlus = faCartPlus;
  faExchangeAlt = faExchangeAlt;
  faPencilAlt = faPencilAlt;

  constructor(private activatedRoute : ActivatedRoute, private productService : ProductService,
              private formBuilder : FormBuilder, private router : Router)  {
        this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
  }

  ngOnInit(): void {
    let currentProdId = this.activatedRoute.snapshot.params['id'];
    //LISTEN TO QUERY CHANGES
    this.activatedRoute.queryParams
      .pipe(takeWhile(() => this.alive))
      .subscribe(query => {
        this.getProduct(currentProdId, query);
      });
  }

  getProduct(productID, query){
    this.productService.getAdminOneProduct(productID, query)
        .pipe(takeWhile(() => this.alive))
        .subscribe((data : Product[]) => {
          if(data || data[0])
            this.product = data[0]
        },error =>{
          console.log(error)
        });
  }

  search(){   
    let query = this.setupSearchQuery();
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams: query, 
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

  ngOnDestroy(){
    this.alive = false;
  }

}
