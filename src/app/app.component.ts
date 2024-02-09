import {
  Component,
  OnInit,
  ViewChildren,
  ViewChild,
  ElementRef,
  DoCheck,
  Directive,
  Renderer2,
  AfterViewInit,
  Output,
  EventEmitter,
  QueryList,
  NgZone,
  ChangeDetectorRef
} from "@angular/core";

import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormArray } from "@angular/forms";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Invoice, Services, Client } from "./invoice.model";

@Component({
  selector: "my-app",
  templateUrl: "./app2.component.html",
  styleUrls: ["./app.component.scss"]
})

export class AppComponent {
  @ViewChild("pageHeight") pageHeight: ElementRef;
  @ViewChild("contentHeight") contentHeight: ElementRef;
  @ViewChild("divHeight") divHeight: ElementRef;

  

  private invoice: Invoice;
  invoiceForm: FormGroup;
  pages: Array<{
    growth: boolean;
    start: number;
    lastServiceElement: number;
  }> = [{ growth: true, start: 0, lastServiceElement: 0 }];
  triggerPageBreak: boolean = false;

  number: any = 0;
  cacheHeight: any = 0;

  private initForm() {
    if (this.invoice == null) {
      this.invoice = {
        _id: "",
        client: {
          companyName: "",
          name: "",
          address: "",
          phone: "",
          website: "",
          clientEmail: ""
        } as Client,
        invoiceNumber: "",
        komnumber: "",
        date: "",
        dueDate: "",
        services: [
          {
            title: "",
            caption: "",
            detail: "",
            price: 0
          }
        ] as Services[],
        subtotal: 0,
        tax: 0,
        discount: 0,
        finalTotal: 0,
        user: "",
        toContact: "",
        salutation: ""
      } as Invoice;
    }
    const serviceArray = this._fb.array([]);
    if (this.invoice["services"]) {
      for (const service of this.invoice.services) {
        serviceArray.push(
          this._fb.group({
            title: [service.title, Validators.required],
            caption: [service.caption, Validators.required],
            detail: [service.detail, Validators.required],
            price: [service.detail, Validators.required]
          })
        );
      }
    }
    this.invoiceForm = this._fb.group({
      client: this._fb.group({
        companyName: [this.invoice.client.companyName, Validators.required],
        name: [this.invoice.client.name],
        address: [this.invoice.client.address, Validators.required],
        postcode: [this.invoice.client.postcode, Validators.required],
        location: [this.invoice.client.location, Validators.required],
        phone: [this.invoice.client.phone],
        website: [this.invoice.client.website],
        clientEmail: [this.invoice.client.clientEmail]
      }),
      komnumber: [this.invoice.komnumber, Validators.required],
      invoiceNumber: [this.invoice.invoiceNumber, Validators.required],
      date: [this.invoice.date, Validators.required],
      dueDate: [this.invoice.dueDate],
      subtotal: [this.invoice.subtotal],
      tax: [this.invoice.tax],
      discount: [this.invoice.discount],
      finalTotal: [this.invoice.finalTotal],
      user: [this.invoice.user, Validators.required],
      toContact: [this.invoice.toContact],
      salutation: [this.invoice.salutation, Validators.required],
      workDescription: [this.invoice.workDescription, Validators.required],
      services: serviceArray
    });
  }

  get services(): any {
    return this.invoiceForm.get("services") as FormArray;
  }

  addService(): any {
    console.log("added Service");
    this.services.push(
      this._fb.group({
        title: [null, Validators.required],
        caption: [null, Validators.required],
        detail: [null, Validators.required],
        price: [null, Validators.required]
      })
    );
  }

  constructor(
    private _fb: FormBuilder,
    private renderer: Renderer2,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy() {}

  ngAfterViewInit(): void {}

  newPage(): void {
    this.pages[this.pages.length - 1].growth = false;

    if (this.pages.length === 1) {
      this.pages[
        this.pages.length - 1
      ].lastServiceElement = this.services.length;
      // this.pages[this.pages.length - 1].end = this.services.length;
    } else {
      this.pages[
        this.pages.length - 1
      ].lastServiceElement = this.services.length;
    }

    this.pages.push({
      growth: true,
      start: this.services.length,
      lastServiceElement: 0
    });
  }

  onSubmit() {
  }

  onResize(ev) {
    console.log("Resize: ", ev.contentRect.height);
    if (ev.contentRect.height > 863) {
      this.newPage();
      this._cdr.detectChanges;
    }
  }
}
