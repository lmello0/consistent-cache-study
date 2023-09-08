import { AddressInterface } from './IAddress';

export interface PersonInterface {
  customer: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  address: AddressInterface[];
  phone: string[];
}
