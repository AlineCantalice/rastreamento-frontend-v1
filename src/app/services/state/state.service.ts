import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from 'src/app/models/city.model';
import { State } from 'src/app/models/state.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private http: HttpClient) { }

  getStates(): Observable<State[]> {
    return this.http.get<State[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
  }

  getCitiesByStatesId(stateId: number): Observable<City[]> {
    return this.http.get<City[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`);
  }

}
