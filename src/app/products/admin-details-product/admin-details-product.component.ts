import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { takeWhile } from 'rxjs/operators';
import { Product } from 'src/app/core/models/product';
import { faShoppingCart, faCartPlus, faExchangeAlt, faPencilAlt  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-details-product',
  templateUrl: './admin-details-product.component.html',
  styleUrls: ['./admin-details-product.component.scss']
})
export class AdminDetailsProductComponent implements OnInit, OnDestroy {
  alive : boolean = true;
  product : Product;
  faShoppingCart = faShoppingCart;
  faCartPlus = faCartPlus;
  faExchangeAlt = faExchangeAlt;
  faPencilAlt = faPencilAlt;

  constructor(private activatedRoute : ActivatedRoute, private productService : ProductService)  { }

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

  ngOnDestroy(){
    this.alive = false;
  }

}
