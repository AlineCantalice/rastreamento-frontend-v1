import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { City } from 'src/app/models/city.model';
import { State } from 'src/app/models/state.model';
import { StateService } from 'src/app/services/state/state.service';
import { UserService } from 'src/app/services/user/user.service';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  @ViewChild(ErrorMessageComponent) errorMessageComponent: ErrorMessageComponent;

  states: State[] = [];
  cities: City[] = [];
  selectedState!: State;
  selectedCity!: City;
  selectedType!: any;
  types: any[] = [
    { key: 'NP', name: 'Pessoa Física' },
    { key: 'LP', name: 'Pessoa Jurídica' },
  ]

  constructor(
    private stateService: StateService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      user: this.formBuilder.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
      }),
      address: this.formBuilder.group({
        street: ['', [Validators.required]],
        zipCode: ['', [Validators.required]],
        number: ['', [Validators.required]],
        complement: [''],
        neighborhood: ['', [Validators.required]],
        city: this.formBuilder.group({
          name: ['', Validators.required],
        }),
        state: this.formBuilder.group({
          name: ['', Validators.required],
        }),
      }),
      legalPerson: this.formBuilder.group({
        cnpj: ['', [Validators.pattern('[0-9]{14}')]],
        tradeName: [''],
        stateRegistration: [''],
      }),
      naturalPerson: this.formBuilder.group({
        cpf: ['', [Validators.pattern('[0-9]{11}')]]
      })
    });
  }

  ngOnInit(): void {
    this.selectedType = this.types[1];
    this.getStates();
  }

  onSubmit() {
    if (this.form.valid) {
      this.userService.register(this.form.value).subscribe({
        next: () => { },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao cadastrar os dados' });
          this.router.navigate(['/']);
        },
        complete: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Dados cadastrados com sucesso' });
          this.router.navigate(['/']);
        }
      });
    }
  }

  onCancel() {
    console.log('onCancel')
  }

  getStates() {
    this.stateService.getStates().subscribe(item => {
      this.states = item;
    })
  }

  getCitiesByStatesId() {
    if (this.selectedState) {
      this.stateService.getCitiesByStatesId(this.selectedState.id).subscribe(item => {
        this.cities = item;
      })
    }
    this.cities = [];
  }

}
