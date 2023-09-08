import { AddressInterface } from './IAddress';

export interface PersonInterface {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  address: AddressInterface[];
  phone: string[];
}
