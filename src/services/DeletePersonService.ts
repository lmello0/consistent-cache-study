import { DeletePersonDTO } from '../dtos/DeletePersonDTO';
import { MongoRepositoryProtocol } from '../repositories/MongoRepositoryProtocol';

export class DeletePersonService {
  constructor(private readonly db: MongoRepositoryProtocol) {}

  async execute(data: DeletePersonDTO) {
    return this.db.delete(data);
  }
}
