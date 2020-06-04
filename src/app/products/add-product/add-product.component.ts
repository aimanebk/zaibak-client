import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  PRODUCT_FORM = this.formBuilder.group({
    code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    article: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    type: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    sellingPrice: ['', [Validators.required]],
    discount: [''],
    equivalents: [''],
    notes: [''],
  });

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
  }

  submit(){
    console.log(this.PRODUCT_FORM.value);
  }

}
