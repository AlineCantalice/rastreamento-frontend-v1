import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/models/product';
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
    //this.product = {};
    this.submitted = false;
    this.productDialog = true;
}

  getListProducts() {
    this.productService.getListProducts().subscribe((products: Product[]) => {
      this.products = products;
      console.log(products)
    }, () => {
      this.errorMessageComponent.setError('Falha ao buscar produtos.');
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.getListProducts();
    }, () => {
      this.errorMessageComponent.setError('Falha ao deletar o produto.');
    });
  }

  hasProduct(): boolean {
    return this.products && this.products.length > 0;
  }

  deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter(val => !this.selectedProducts.includes(val));
                this.selectedProducts = null;
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
            }
        });
    }

    editProduct(product: Product) {
      this.product = {...product};
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
              this.products[this.findIndexById(this.product.id)] = this.product;                
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
          }
          else {
              this.product.name = 'product-placeholder.svg';
              this.products.push(this.product);
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
          }

          this.products = [...this.products];
          this.productDialog = false;
          //this.product = {};
      }
  }

  findIndexById(id: number): number {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

}
