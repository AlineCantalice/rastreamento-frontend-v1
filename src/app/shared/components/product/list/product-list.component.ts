import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ProductListComponent implements OnInit {

  products: Product[];
  product: Product;

  productDialog: boolean;
  showMaterialForm: boolean = false;

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.getListProducts();
  }

  getListProducts() {
    this.productService.getListProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Lista de produtos atualizada', life: 3000 });
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao listar produtos', life: 3000 });
    });
  }

  openNew() {
    this.productDialog = true;
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar o produto ' + product.name + '?',
      header: 'Deletar produto?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.productService.deleteProduct(product.id).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto Deletado com sucesso', life: 3000 });
          this.getListProducts();
        });
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.product = undefined;
  }

}
