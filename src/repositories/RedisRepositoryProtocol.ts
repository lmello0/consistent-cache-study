export interface RedisRepositoryProtocol {
  get(key: string): Promise<JSON>;

  store(key: string, data: object): void;
}
