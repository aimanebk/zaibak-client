import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/core/services/product.service';
import { FormBuilder, Validators } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-admin-return-product',
  templateUrl: './admin-return-product.component.html',
  styleUrls: ['./admin-return-product.component.scss']
})
export class AdminReturnProductComponent implements OnInit, OnDestroy {
  @Input() productID : string;

  RETURN_FORM = this.formBuilder.group({
    username: ['', [Validators.minLength(3), Validators.maxLength(50)]],
    quantity: ['', [Validators.required, Validators.min(1)]],
    price: ['', [Validators.required, Validators.min(0)]],
  });

  currentUser : User ;
  disabled : boolean = false;
  loading : boolean = false;
  alive : boolean = true;
  constructor(private authenticationService : AuthenticationService, private toastr : ToastrService,
              private productService : ProductService, private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
  }


  submit(){
    if(!this.productID && !this.currentUser && !this.currentUser.username)
      return this.showError('Une erreur est survenue veuillez réessayer ultérieurement');

    if(this.RETURN_FORM.dirty && this.RETURN_FORM.valid) {
      this.loading = true;
      this.RETURN_FORM.get('username').setValue(this.currentUser.username);

      this.productService.returnProduct(this.productID, this.RETURN_FORM.value)
        .pipe(takeWhile(() => this.alive))
        .subscribe((result : any) => {
          this.showSuccess("Opération effectué avec succès")
          this.loading = false;
          $('#returnProduct').modal('hide');
        }, error => {
          this.showError(error);
          this.loading = false;
        })
    }
    
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
