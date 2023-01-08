import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getListProducts(): Observable<Product[]>{
    const url = `${environment.apiUrl}/product`;
    return this.http.get<Product[]>(url);
  }

  getProduct(id: number): Observable<Product>{
    const url = `${environment.apiUrl}/product/${id}`;
    return this.http.get<Product>(url);
  } 

  addProduct(product: Product): Observable<Product>{
    const url = `${environment.apiUrl}/product`;
    return this.http.post<Product>(url, product);
  }

  updateProduct(product: Product): Observable<Product>{
    const url = `${environment.apiUrl}/product/${product.id}`;
    return this.http.put<Product>(url, product);
  }

  deleteProduct(id: number): Observable<Product>{
    const url = `${environment.apiUrl}/product/${id}`;
    return this.http.delete<Product>(url);
  }

}
