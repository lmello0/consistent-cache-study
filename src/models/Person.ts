import { model } from 'mongoose';
import { PersonInterface } from '../interfaces/IPerson';
import { personSchema } from '../schemas/personSchema';

const Person = model<PersonInterface>('Person', personSchema);

export { Person };
