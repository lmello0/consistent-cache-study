import { Schema } from 'mongoose';
import { AddressInterface } from '../interfaces/IAddress';

const addressSchema = new Schema<AddressInterface>({
  state: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  number: { type: String, required: true },
  type: String,
});

export { addressSchema };
