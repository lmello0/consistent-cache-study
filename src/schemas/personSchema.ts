import mongoose from 'mongoose';
import { PersonInterface } from '../interfaces/IPerson';
import { addressSchema } from './addressSchema';

const personSchema = new mongoose.Schema<PersonInterface>({
  firstName: { type: String, required: true },
  lastName: { type: String },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  address: { type: [addressSchema], required: true },
  phone: [String],
});

export { personSchema };
