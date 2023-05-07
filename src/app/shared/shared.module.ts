import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { PersonTypeInputComponent } from './components/person-type-input/person-type-input.component';
import { ProductFormComponent } from './components/product/form/product-form.component';
import { RegisterComponent } from './components/register/register.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { SidebarModule } from 'primeng/sidebar';
import { SliderModule } from 'primeng/slider';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './components/product/list/product-list.component';
import { ProductionMaterialComponent } from './components/production-material/production-material.component';

const PRIME_NG = [
  ToastModule,
  CardModule,
  InputTextModule,
  PasswordModule,
  ButtonModule,
  InputMaskModule,
  RadioButtonModule,
  DropdownModule,
  MessageModule,
  MessagesModule,
  TableModule,
  ToolbarModule,
  CalendarModule,
  SliderModule,
  MultiSelectModule,
  ContextMenuModule,
  DialogModule,
  ProgressBarModule,
  FileUploadModule,
  RatingModule,
  InputNumberModule,
  ConfirmDialogModule,
  InputTextareaModule,
  SidebarModule,
  MenuModule,
  CheckboxModule,
  StyleClassModule,
];

@NgModule({
  declarations: [
    LoginComponent,
    ErrorMessageComponent,
    PersonTypeInputComponent,
    ProductFormComponent,
    RegisterComponent,
    ProductListComponent,
    ProductionMaterialComponent,
  ],
  exports: [
    LoginComponent,
    ErrorMessageComponent,
    PersonTypeInputComponent,
    ProductFormComponent,
    RegisterComponent,
    ProductListComponent,
    ...PRIME_NG,
  ],
  imports: [
    ...PRIME_NG,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [MessageService, ConfirmationService],
})
export class SharedModule { }
