import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ListProductComponent implements OnInit {
  public products: Product[];
  product: Product;
  selectedProducts: Product[];
  submitted: boolean;
  productDialog: boolean;
  @ViewChild(ErrorMessageComponent) errorMessageComponent: ErrorMessageComponent;

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getListProducts();
  }

  openNew() {
    this.product = {
      name: "",
      price: null,
      receiptDate: null,
      shippingDate: null,
      variety: "",
      batch: null,
      weight: null
    };
    this.submitted = false;
    this.productDialog = true;
  }

  getListProducts() {
    this.productService.getListProducts().subscribe((products: Product[]) => {
      this.products = products;
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro to find products', life: 3000 });
    });
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product.id).subscribe({
      next: value => {
      this.getListProducts();
    }, error: error => {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Erro to delete product', life: 3000});
    }});
    this.getListProducts();
  }

  hasProduct(): boolean {
    return this.products && this.products.length > 0;
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name.trim()) {
      if (this.product.id) {
        this.productService.updateProduct(this.product).subscribe({
          next: response => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        }, error: error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro to update product', life: 3000 });
        }});
      }
      else {
        this.productService.addProduct(this.product).subscribe({
          next: reponse => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }, error: error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro to create product', life: 3000 });
        }})
      }      
      this.getListProducts();
      this.productDialog = false;
      this.product = {
        name: "",
        price: null,
        receiptDate: null,
        shippingDate: null,
        variety: "",
        batch: null,
        weight: null
      };
    }
  }

}
