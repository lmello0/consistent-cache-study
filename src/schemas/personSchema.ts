import mongoose from 'mongoose';
import { PersonInterface } from '../interfaces/IPerson';
import { addressSchema } from './addressSchema';

const personSchema = new mongoose.Schema<PersonInterface>(
  {
    customer: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    address: { type: [addressSchema], required: true },
    phone: [String],
  },
  {
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.id;
        delete ret._id;
        return ret;
      },
    },
  },
);

export { personSchema };
