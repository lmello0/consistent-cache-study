import { PersonInterface } from '../interfaces/IPerson';

export interface UpdatePersonDTO {
  email: string;
  newData: PersonInterface;
}
