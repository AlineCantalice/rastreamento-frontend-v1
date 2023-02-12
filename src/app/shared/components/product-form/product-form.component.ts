import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

  @Input() product: Product;
  @Input() submitted: boolean;
  @Input() productDialog: boolean;

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
  ){}

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(() => {
      //this.getListProducts(); - FAZER UM ROUTER PARA TABELA
    }, () => {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Erro to delete product', life: 3000});
    });
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
        this.productService.updateProduct(this.product).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro to update product', life: 3000 });
        });
      }
      else {
        this.productService.addProduct(this.product).subscribe(reponse => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro to create product', life: 3000 });
        })
      }      
      //this.getListProducts();  - FAZER UM ROUTER PARA TABELA
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
