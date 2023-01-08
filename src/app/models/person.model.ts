import { Address } from "./address.model";
import { LegalPerson } from "./legal-person.model";
import { NaturalPerson } from "./natural-person.model";
import { User } from "./user.model";

export interface Person {
    id: number;
    name: string;
    phone: string;
    user: User;
    address: Address;
    legalPerson?: LegalPerson;
    naturalPerson?: NaturalPerson;
}