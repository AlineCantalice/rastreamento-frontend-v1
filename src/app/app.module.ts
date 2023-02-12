import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListProductComponent } from './layouts/list-product/list-product.component';
import { ErrorMessageComponent } from './shared/components/error-message/error-message.component';
import { LoginComponent } from './shared/components/login/login.component';
import { PersonTypeInputComponent } from './shared/components/person-type-input/person-type-input.component';
import { ProductFormComponent } from './shared/components/product-form/product-form.component';
import { RegisterComponent } from './shared/components/register/register.component';
import {SidebarModule} from 'primeng/sidebar';
import {MenuModule} from 'primeng/menu';
import { MenuComponent } from './shared/components/menu/menu.component';
import {CheckboxModule} from 'primeng/checkbox';
import {StyleClassModule} from 'primeng/styleclass';

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
    AppComponent,
    ErrorMessageComponent,
    LoginComponent,
    PersonTypeInputComponent,
    RegisterComponent,
    ListProductComponent,
    ProductFormComponent,
    MenuComponent,
  ],
  imports: [
    ...PRIME_NG,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
