import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { RangeService } from 'src/app/core/services/range.service';
import { ToastrService } from 'ngx-toastr';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, OnDestroy {

  CATEGORY_FORM = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
  });
  
  alive : boolean = true;
  loading : boolean = false;

  constructor(private formBuilder : FormBuilder, private rangeService : RangeService,
              private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  submit(){
    if(this.CATEGORY_FORM.dirty && this.CATEGORY_FORM.valid) {
      this.loading = true;
      this.rangeService.addRange(this.CATEGORY_FORM.value)
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
