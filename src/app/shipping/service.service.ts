import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ShippingDetails } from './shipping-details';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private productsUrl = 'http://localhost:19586/api/';
  constructor(private http: HttpClient) {}
  getShipping(): Observable<ShippingDetails> {
      return of(this.initializeShipping());
    
  }
  createShipping(shippingdetails: ShippingDetails): Observable<ShippingDetails> {
    console.log('createProducts: ' + JSON.stringify(shippingdetails))
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    var url=this.productsUrl + "ShippingDetails"
    return this.http.post<ShippingDetails>(url, shippingdetails, {
      headers,
    }).pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(shippingdetails)))
      );;
  }
  getShippings(): Observable<ShippingDetails[]> {
    var url=this.productsUrl + "ShippingDetails"
    return this.http.get<ShippingDetails[]>(url);
  }
  deleteProduct(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete<ShippingDetails>(url, { headers });
  }
  private initializeShipping(): ShippingDetails {
    // Return an initialized object
    return {
      Id: 0,
      senderName: null,
      description: null,
      receiptAddress: null,
      expedited: false,
      shipmentType: 1,
      
    };
  }
}
