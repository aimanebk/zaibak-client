import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import * as jsPDF from 'jspdf'
import html2canvas from 'html2canvas';
import { faTrashAlt, faPlus, faLongArrowAltLeft, faTools, faCloudDownloadAlt, faPrint  } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;
  faLongArrowAltLeft = faLongArrowAltLeft;
  faTools = faTools;
  faCloudDownloadAlt = faCloudDownloadAlt;
  faPrint = faPrint;
  ZAIBAK_INFO_1 = "19 RDC, Rue Oued Deraa, Jirari II, TANGER - Tél.: 05.39.35.55.99/06.76.50.71.67";
  ZAIBAK_INFO_2 = "T.P : 57100813 - I.F: 24816967 - C.N.S.S.: 5582269 – R.C.: 83167 - ICE : 001949049000020";
  INVOICE_FORM: FormGroup;
  company : string ;
  TVA :number = 20;
  amountHT :number = 0;
  tvaAmount :number = 0;
  totalAmountTTC :number = 0;
  editPDF : boolean = true ;
  

  @ViewChild('invoice') invoice :ElementRef;


  constructor(private fb: FormBuilder) {
  }

  ngOnInit() :void {
    this.INVOICE_FORM = this.fb.group({
      items: this.fb.array([this.createItem()])
    })
  }

  createItem() {
    return this.fb.group({
      quantite: [1],
      price: [0],
    })
  }

  addRow() {
    (this.INVOICE_FORM.controls['items'] as FormArray).push(this.createItem())
  }

  deleteRow(index) {
    (this.INVOICE_FORM.controls['items'] as FormArray).removeAt(index);
    this.amountsCalculator();
  }

  amountsCalculator(){
    let amountTTC = 0;

    this.INVOICE_FORM.value.items.forEach(item => {
      amountTTC += (item.quantite * item.price);
    });
    this.totalAmountTTC = amountTTC;
    this.tvaAmount = (this.totalAmountTTC / 120 ) * this.TVA ;
    this.amountHT = this.totalAmountTTC - this.tvaAmount;
  }

  changePdfState(){
    this.editPDF = !this.editPDF;
  }

  printInvoice(){
    window.print();
  }

  downloadPDF() {
    html2canvas(this.invoice.nativeElement, {
      scrollY: -window.scrollY,
      scrollX: -window.scrollX,
      scale :3
    }).then(canvas => {
              let DataURL=  canvas.toDataURL("image/jpeg");
              let doc = new jsPDF(); // using defaults: orientation=portrait, unit=mm, size=A4
              let width = doc.internal.pageSize.getWidth();    
              let height = doc.internal.pageSize.getHeight();
              doc.addImage(DataURL, 'JPEG', 10, 10, width - 20, 0);
              doc.setFontSize(8);
              doc.setFontType('bold');
              doc.text(this.ZAIBAK_INFO_1, width/2, height - 10,  { align: "center" })
              doc.text(this.ZAIBAK_INFO_2, width/2, height - 5, { align: "center" })


              //GENERATE PDF NAME
              const name = `${this.company}-${formatDate(new Date, 'dd-MM-yyyy', 'en-US')}`;
              doc.save(`${name}.pdf`); //Download the rendered PDF.
        })
  }
}
