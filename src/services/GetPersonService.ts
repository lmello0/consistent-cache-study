import { GetPersonDTO } from '../dtos/GetPersonDTO';
import { MongoRepositoryProtocol } from '../repositories/MongoRepositoryProtocol';

export class GetPersonService {
  constructor(private readonly db: MongoRepositoryProtocol) {}

  async execute(data: GetPersonDTO) {
    return this.db.findOne({ email: data.email });
  }
}
