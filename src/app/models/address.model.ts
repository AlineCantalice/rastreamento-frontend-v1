import { City } from "./city.model";
import { State } from "./state.model";

export interface Address {
    id: number;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    zipCode: string;
    state: State;
    city: City;
}