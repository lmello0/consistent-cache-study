export type AddressTypeType = 'Home Address' | 'Business Address';

export interface AddressInterface {
  number: number;
  street: string;
  city: string;
  state: string;
  type: AddressTypeType;
}
