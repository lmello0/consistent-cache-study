import { model } from 'mongoose';
import { AddressInterface } from '../interfaces/IAddress';
import { addressSchema } from '../schemas/addressSchema';

const Address = model<AddressInterface>('Address', addressSchema);

export { Address };
