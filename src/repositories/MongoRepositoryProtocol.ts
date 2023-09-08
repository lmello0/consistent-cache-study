import { CreatePersonDTO } from '../dtos/CreatePersonDTO';
import { DeletePersonDTO } from '../dtos/DeletePersonDTO';
import { UpdatePersonDTO } from '../dtos/UpdatePersonDTO';
import { PersonInterface } from '../interfaces/IPerson';

export interface MongoRepositoryProtocol {
  findAll(): Promise<PersonInterface[]>;

  findOne(email: string): Promise<null | PersonInterface>;

  create(data: CreatePersonDTO): Promise<PersonInterface>;

  update(data: UpdatePersonDTO): Promise<PersonInterface>;

  delete(data: DeletePersonDTO): Promise<string>;
}
