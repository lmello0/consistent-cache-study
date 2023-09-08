import { UpdatePersonDTO } from '../dtos/UpdatePersonDTO';
import { MongoRepositoryProtocol } from '../repositories/MongoRepositoryProtocol';

export class UpdatePersonService {
  constructor(private readonly db: MongoRepositoryProtocol) {}

  async execute(data: UpdatePersonDTO) {
    return await this.db.update(data);
  }
}
