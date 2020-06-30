import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/core/models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { takeWhile } from 'rxjs/operators';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-storekeeper-details-product',
  templateUrl: './storekeeper-details-product.component.html',
  styleUrls: ['./storekeeper-details-product.component.scss']
})
export class StorekeeperDetailsProductComponent implements OnInit, OnDestroy {
  alive : boolean = true;
  product : Product;
  faShoppingCart = faShoppingCart;

  constructor(private activatedRoute : ActivatedRoute, private productService : ProductService)  { }

  ngOnInit(): void {
    let currentProdId = this.activatedRoute.snapshot.params['id'];

    this.getProduct(currentProdId);

  }

  getProduct(productID){
    this.productService.getStorekeeperOneProduct(productID)
        .pipe(takeWhile(() => this.alive))
        .subscribe((data : Product) => {
          // if(data || data[0])
            this.product = data
        },error =>{
          console.log(error)
        });
  }

  ngOnDestroy(){
    this.alive = false;
  }
}
