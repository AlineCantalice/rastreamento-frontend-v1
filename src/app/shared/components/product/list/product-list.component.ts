import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  form: FormGroup;
  materialsFormArray: FormArray;

  i: number = 0;

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getListProducts();
    this.createProductForm();
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
    this.createProductForm();
    this.productDialog = true;
  }

  editProduct(product: Product) {
    this.createProductForm();
    console.log(product)
    this.form.patchValue({
      id: product.id,
      name: product.name,
      variety: product.variety,
      receiptDate: product.receiptDate,
      shippingDate: product.shippingDate,
      weight: product.weight,
      price: product.price,
      batch: {
        id: product.batch.id,
        value: product.batch.value,
        productionMaterial: []
      }
    });

    this.product = { ...product };

    if (this.product.batch && this.product.batch.productionMaterial) {
      const materials = this.product.batch.productionMaterial;
      materials.forEach(material => {
        this.materialsFormArray.push(this.createMaterialForm(material));
      });
    }

    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar o produto ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(product.id).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto Deletado com sucesso', life: 3000 });
          this.getListProducts();
        });
      }
    });
  }

  hideDialog() {
    this.form.reset();
    this.materialsFormArray.clear();
    this.productDialog = false;
  }

  createMaterialsForm() {
    this.materialsFormArray = this.formBuilder.array([]);
  }

  createProductForm() {
    this.createMaterialsForm();

    this.form = this.formBuilder.group({
      id: null,
      name: ['', [Validators.required]],
      price: [null, [Validators.required]],
      receiptDate: [null, [Validators.required]],
      shippingDate: [null, [Validators.required]],
      variety: ['', [Validators.required]],
      batch: this.formBuilder.group({
        value: [''],
        productionMaterial: this.materialsFormArray
      }),
      weight: [null, [Validators.required]]
    });
  }

  createMaterialForm(material: any = null) {
    return this.formBuilder.group({
      name: [material ? material.name : '', [Validators.required, Validators.minLength(3)]],
      type: [material ? material.type : '', [Validators.required, Validators.minLength(3)]],
      supplier: [material ? material.supplier : '', [Validators.required, Validators.minLength(3)]],
      batch: [material ? material.batch : '', [Validators.required, Validators.minLength(3)]],
      receiptDate: [material ? material.receiptDate : null, [Validators.required]]
    });
  }

  addMaterialForm() {
    this.materialsFormArray.push(this.createMaterialForm());
  }

  removeMaterialForm(index: number) {
    this.materialsFormArray.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.form.value.name.trim()) {
        if (this.form.value.id) {
          this.productService.updateProduct(this.form.value).subscribe(response => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Producto atualizado com sucesso', life: 3000 });
            this.getListProducts();
          }, error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao atualizar produto', life: 3000 });
          });
        }
        else {
          this.productService.addProduct(this.form.value).subscribe(reponse => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Produto adicionado com sucesso', life: 3000 });
            this.getListProducts();
          }, error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao adicionar produto', life: 3000 });
          })
        }
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Verifique se todos os campos forma preenchidos corretamente.', life: 3000 });
    }
    this.form.reset();
    this.hideDialog();
  }

}
