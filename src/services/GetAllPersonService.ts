import { GetPeopleDTO } from '../dtos/GetPeopleDTO';
import { MongoRepositoryProtocol } from '../repositories/MongoRepositoryProtocol';

export class GetAllPersonService {
  constructor(private readonly db: MongoRepositoryProtocol) {}

  async execute(data: GetPeopleDTO) {
    return this.db.findAll({ customer: data.customer });
  }
}
