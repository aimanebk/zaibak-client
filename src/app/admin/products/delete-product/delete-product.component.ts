import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeWhile } from 'rxjs/operators';
import { User } from 'src/app/core/models/user';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ProductService } from 'src/app/core/services/product.service';
declare var $: any;

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent implements OnInit {
  @Input() productID : string;
  currentUser : User ;
  disabled : boolean = false;
  loading : boolean = false;
  alive : boolean = true;

  constructor(private authenticationService : AuthenticationService, private toastr : ToastrService,
              private productService : ProductService, private router : Router) { }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
  }


  remove(){
    if(!this.productID && !this.currentUser && !this.currentUser.username)
      return this.showError('Une erreur est survenue veuillez réessayer ultérieurement');

    this.loading = true;

    this.productService.deleteProduct(this.productID)
      .pipe(takeWhile(() => this.alive))
      .subscribe((result : any) => {
        this.showSuccess("Opération effectué avec succès")
        this.loading = false;
        $('#deleteProduct').modal('hide');
        this.router.navigate(['admin/product'])
      }, error => {
        this.showError(error);
        this.loading = false;
      })
    
  }

  ngOnDestroy(){
    this.alive = false
  }

  showError(errorMessage){
    this.toastr.error(errorMessage, "Erreur");
  }

  showSuccess(message){
    this.toastr.success(message, "Success")
  }
}
