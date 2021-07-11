import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ShippingRoutingModule } from './shipping-routing.module';
import { ShippingListComponent } from './shipping-list.component';
import { ShippingComponent } from './shipping.component';


@NgModule({
  declarations: [ShippingListComponent],
  imports: [
    CommonModule,
    ShippingRoutingModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'createshipping', component: ShippingComponent },
      
    ])
  ]
})
export class ShippingModule { }
