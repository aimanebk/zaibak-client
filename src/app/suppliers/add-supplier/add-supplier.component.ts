import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { SupplierService } from 'src/app/core/services/supplier.service';
import { ToastrService } from 'ngx-toastr';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent implements OnInit {


  SUPPLIER_FORM = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
  });
  
  alive : boolean = true;
  loading : boolean = false;

  constructor(private formBuilder : FormBuilder, private supplierService : SupplierService,
              private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  submit(){
    if(this.SUPPLIER_FORM.dirty && this.SUPPLIER_FORM.valid) {
      this.loading = true;
      this.supplierService.addSupplier(this.SUPPLIER_FORM.value)
        .pipe(takeWhile(() => this.alive))
        .subscribe((result : any) => {
          this.showSuccess("Opération effectué avec succès")
          this.loading = false;
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
