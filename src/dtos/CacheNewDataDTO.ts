import { PersonInterface } from '../interfaces/IPerson';

export interface CacheNewDataDTO {
  originalUrl: string;
  person?: PersonInterface;
}
