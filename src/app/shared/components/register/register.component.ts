import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { City } from 'src/app/models/city.model';
import { State } from 'src/app/models/state.model';
import { StateService } from 'src/app/services/state/state.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

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
      name: ['', Validators.required],
      phone: ['', Validators.required],
      cpf: [''],
      cnpj: [''],
      tradeName: [''],
      stateRegistration: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      complement: [''],
      neighborhood: ['', Validators.required],
      zipCode: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.selectedType = this.types[1];
    this.getStates();
  }

  onSubmit() {
    this.userService.register(this.form.value).subscribe(result => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Dados cadastrados com sucesso' });
      this.router.navigate(['/']);
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao cadastrar os dados' });
    })
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
