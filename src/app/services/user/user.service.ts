import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from 'src/app/models/person.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = environment.apiUrl

  constructor(private http: HttpClient) { }

  register(data: any) {

    let type = "";

    if(data.cpf) {
      type = "NP";
    } else {
      type = "LP";
    }

    const body = {
      name: data.name,
      phone: data.phone,
      type: type,
      cpf: data.cpf,
      cnpj: data.cnpj,
      tradeName: data.tradeName,
      stateRegistration: data.stateRegistration,
      username: data.username,
      password: data.password,
      address: {
        street: data.street,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        zipCode: data.zipCode,
        state: data.state.nome,
        city: data.city.nome
      }
    }
    return this.http.post<Person>(`${this.URL}/register`, body);
  }

}
