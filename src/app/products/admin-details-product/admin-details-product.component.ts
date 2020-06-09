import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-admin-details-product',
  templateUrl: './admin-details-product.component.html',
  styleUrls: ['./admin-details-product.component.scss']
})
export class AdminDetailsProductComponent implements OnInit, OnDestroy {
  alive : boolean = true;

  constructor(private route : ActivatedRoute, private productService : ProductService)  { }

  ngOnInit(): void {
    let currentProdId = this.route.snapshot.params['id'];
    this.getProduct(currentProdId);
  }

  getProduct(productID){
    this.productService.getAdminOneProduct(productID)
        .pipe(takeWhile(() => this.alive))
        .subscribe(data => {
          console.log(data);
        },error =>{
          console.log(error)
        });
  }

  ngOnDestroy(){
    this.alive = false;
  }

}
