import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShippingComponent } from './shipping/shipping.component';
import { ShippingModule } from './shipping/shipping.module';
import { ShippingListComponent } from './shipping/shipping-list.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ShippingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ShippingModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'welcome', component: ShippingListComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
