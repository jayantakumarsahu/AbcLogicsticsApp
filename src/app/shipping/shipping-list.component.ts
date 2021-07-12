import { Component, OnInit } from '@angular/core';
import { ShippingDetails } from './shipping-details';
import { ServiceService } from './service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shipping-list',
  templateUrl: './shipping-list.component.html',
  styleUrls: ['./shipping-list.component.css']
})
export class ShippingListComponent implements OnInit {
  pageTitle = 'shipping List';
  errorMessage = '';
  shippings: ShippingDetails[] = [];

  constructor(private shippingService: ServiceService,
                      private router: Router,) { }

  ngOnInit(): void {
    this.shippingService.getShippings().subscribe({
      next: shippinglist => {
        this.shippings = shippinglist;
      },
      error: err => this.errorMessage = err
    });
  }
  deleteShipping(id: number): void {
    if (id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      this.shippingService.deleteShipping(id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
    }
  }
  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.router.navigate(['/welcome']);
  }

}
