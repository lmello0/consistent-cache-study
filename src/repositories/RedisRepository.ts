import { Duration } from 'luxon';
import { redis } from '../db/redis';
import { RedisRepositoryProtocol } from './RedisRepositoryProtocol';
import { PersonInterface } from '../interfaces/IPerson';
import { CacheNewDataDTO } from '../dtos/CacheNewDataDTO';

export class RedisRepository implements RedisRepositoryProtocol {
  async get(key: string): Promise<PersonInterface | PersonInterface[]> {
    const data = (await redis.json.get(key)) as string;

    return JSON.parse(data);
  }

  store(key: string, data: object): void {
    redis.json.set(key, '.', JSON.stringify(data));

    redis.expire(key, Duration.fromObject({ hour: 1 }).as('seconds'));
  }

  delete(key: string): void {
    redis.json.del(key);
  }

  async updateCache(customer: string, email: string, newData: CacheNewDataDTO) {
    const matchingKeys = (await redis.scan(0, { MATCH: `${customer}*` })).keys;

    for (const key of matchingKeys) {
      let data = (await this.get(key)) || [];

      if (Array.isArray(data)) {
        if (newData.person) {
          const index = data.findIndex((item) => item.email === email);
          if (index !== -1) {
            data[index] = newData.person;
          } else {
            data.push(newData.person);
          }
        } else {
          data = data.filter((item) => item.email !== email);
        }
      } else if (newData.person) {
        const newKey = `${customer}:${
          newData.person.email
        }:${newData.originalUrl.replace(email, newData.person.email)}`;

        this.delete(key);
        this.store(newKey, newData.person);
        continue;
      } else {
        this.delete(key);
      }

      this.store(key, data);
    }
  }
}
