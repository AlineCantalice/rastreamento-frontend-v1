import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  @Input() product: Product;
  @Input() productDialog: boolean;

  @Output() save: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter<boolean>();

  materialsFormArray: FormArray;
  types = ['Sementes', 'Adubo', 'Agrotóxico', 'Outros'];
  selectedType: string[];
  form: FormGroup;
  i: number = 0;
  title = "";

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    if(this.product === undefined){
      this.createProductForm();
      this.title = 'Adicionar produto';
    } else {
      this.editProduct(this.product);
      this.title = 'Editar produto';
    }
  }

  hideDialog() {
    this.productDialog = false;
    this.closeDialog.emit(true);
  }

  editProduct(product: Product) {
    this.createProductForm();
    this.form.patchValue({
      id: product.id,
      name: product.name,
      variety: product.variety,
      receiptDate: product.receiptDate ? new Date(product.receiptDate) : null,
      shippingDate: product.shippingDate ? new Date(product.shippingDate) : null,
      weight: product.weight,
      price: product.price,
      batch: {
        id: product.batch.id,
        value: product.batch.value,
        productionMaterial: []
      }
    });

    if (product.batch && product.batch.productionMaterial) {
      const materials = product.batch.productionMaterial;
      materials.forEach((material, index) => {
        this.materialsFormArray.push(this.createMaterialForm(material, index));
      });
    }

    this.productDialog = true;
  }

  createMaterialsForm() {
    this.materialsFormArray = this.formBuilder.array([]);
    this.selectedType = [];
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
        value: uuidv4(),
        productionMaterial: this.materialsFormArray
      }),
      weight: [null, [Validators.required]]
    });
  }

  createMaterialForm(material: any = null, index?: number) {
    if(index != undefined) {
      this.selectedType[index] = material.type;
      if(material.type !== 'Sementes' || material.type !== 'Adubo' || material.type !== 'Agrotóxico' || material.type !== 'Outros'){
        this.types.push(material.type);
      }
    }
    
    return this.formBuilder.group({
      name: [material ? material.name : '', [Validators.required, Validators.minLength(3)]],
      type: [material ? material.type : '', [Validators.required]],
      supplier: [material ? material.supplier : '', [Validators.required, Validators.minLength(3)]],
      batch: [material ? material.batch : '', [Validators.required, Validators.minLength(3)]],
      receiptDate: [material ? new Date(material.receiptDate) : null, [Validators.required]]
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
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Producto atualizado com sucesso.', life: 3000 });
          }, error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar produto.', life: 3000 });
          });
        }
        else {
          this.productService.addProduct(this.form.value).subscribe(reponse => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto adicionado com sucesso.', life: 3000 });
          }, error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao adicionar produto.', life: 3000 });
          })
        }
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Verifique se todos os campos foram preenchidos corretamente.', life: 3000 });
    }
    this.save.emit(this.form.value as Product);
    this.form.reset();
    this.hideDialog();
  }

}
