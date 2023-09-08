import { Duration } from 'luxon';
import { redis } from '../db/redis';
import { RedisRepositoryProtocol } from './RedisRepositoryProtocol';

export class RedisRepository implements RedisRepositoryProtocol {
  async get(key: string): Promise<JSON> {
    const data = (await redis.json.get(key)) as string;

    return JSON.parse(data);
  }

  store(key: string, data: object): void {
    redis.json.set(key, '.', JSON.stringify(data));

    redis.expire(key, Duration.fromObject({ hour: 1 }).as('seconds'));
  }
}
