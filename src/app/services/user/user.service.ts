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

    const body: Person = {
      name: data.name,
      phone: data.phone,
      naturalPerson: {
        cpf: data.naturalPerson.cpf,
      },
      legalPerson: {
        cnpj: data.legalPerson.cnpj,
        tradeName: data.legalPerson.tradeName,
        stateRegistration: data.legalPerson.stateRegistration
      },
      user: {
        username: data.user.username,
        password: data.user.password,
      },
      address: {
        street: data.address.street,
        number: data.address.number,
        complement: data.address.complement,
        neighborhood: data.address.neighborhood,
        zipCode: data.address.zipCode,
        state: {
          id: data.address.state.name.id,
          name: data.address.state.name.nome
        },
        city: {
          id: data.address.city.name.id,
          name: data.address.city.name.nome
        }
      }
    }
    return this.http.post<Person>(`${this.URL}/register`, body);
  }

}
