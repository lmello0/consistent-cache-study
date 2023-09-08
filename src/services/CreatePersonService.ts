import { CreatePersonDTO } from '../dtos/CreatePersonDTO';
import { MongoRepositoryProtocol } from '../repositories/MongoRepositoryProtocol';

export class CreatePersonService {
  constructor(private readonly db: MongoRepositoryProtocol) {}

  async execute(data: CreatePersonDTO) {
    return await this.db.create(data);
  }
}
