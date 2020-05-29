import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormValidationService } from 'src/app/core/services/form-validation.service';

@Component({
  selector: 'control-messages',
  template: '<div *ngIf="errorMessage !== null">{{errorMessage}}</div>'
})
export class ControlMessagesComponent{

  @Input() control: FormControl;
  constructor() { }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return FormValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }

}
