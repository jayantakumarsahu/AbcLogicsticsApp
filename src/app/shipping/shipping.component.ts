import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  FormControlName,FormsModule,ReactiveFormsModule
} from '@angular/forms';
import { ShippingDetails } from './shipping-details';
import { ServiceService } from './service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css'],
})
export class ShippingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  title = 'AbcLogicsticsApp';
  private sub: Subscription;
  errorMessage: string;
  pageTitle = 'Shipping';
  shippingForm: FormGroup;
  shippingDetails: ShippingDetails;
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ShippingService: ServiceService) {

    }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.shippingForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      
    });
  }
  getShipping(): void {
    this.ShippingService.getShipping()
      .subscribe({
        next: (ShippingDetails: ShippingDetails) => this.displayShipping(ShippingDetails),
        error: err => this.errorMessage = err
      });
  }
  displayShipping(shippingDetails: ShippingDetails): void {
    if (this.shippingForm) {
      this.shippingForm.reset();
    }
    this.shippingDetails = shippingDetails;
this.pageTitle = 'Add Shipping';

    // Update the data on the form
    this.shippingForm.patchValue({
      SenderName: this.shippingDetails.senderName,
      Description: this.shippingDetails.description,
      ReceiptAddress: this.shippingDetails.receiptAddress,
      Expedited: this.shippingDetails.expedited,
      ShipmentType: this.shippingDetails.shipmentType
    });
  }
  saveProduct(): void {
  const p = { ...this.shippingDetails, ...this.shippingForm.value };
  console.log('createProduct: ' + JSON.stringify(p))
  this.ShippingService.createShipping(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
  }
  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.shippingForm.reset();
    this.router.navigate(['/products']);
  }
}
