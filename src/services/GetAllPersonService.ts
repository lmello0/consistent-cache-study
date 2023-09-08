import { MongoRepositoryProtocol } from '../repositories/MongoRepositoryProtocol';

export class GetAllPersonService {
  constructor(private readonly db: MongoRepositoryProtocol) {}

  async execute() {
    return this.db.findAll();
  }
}
