import { CacheNewDataDTO } from '../dtos/CacheNewDataDTO';
import { PersonInterface } from '../interfaces/IPerson';

export interface RedisRepositoryProtocol {
  get(key: string): Promise<PersonInterface | PersonInterface[]>;

  store(key: string, data: object): void;

  updateCache(customer: string, email: string, newData: CacheNewDataDTO): void;
}
