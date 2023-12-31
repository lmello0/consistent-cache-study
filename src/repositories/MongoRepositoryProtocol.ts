import { CreatePersonDTO } from '../dtos/CreatePersonDTO';
import { DeletePersonDTO } from '../dtos/DeletePersonDTO';
import { GetPeopleDTO } from '../dtos/GetPeopleDTO';
import { GetPersonDTO } from '../dtos/GetPersonDTO';
import { UpdatePersonDTO } from '../dtos/UpdatePersonDTO';
import { PersonInterface } from '../interfaces/IPerson';

export interface MongoRepositoryProtocol {
  findAll(data: GetPeopleDTO): Promise<PersonInterface[]>;

  findOne(data: GetPersonDTO): Promise<null | PersonInterface>;

  create(data: CreatePersonDTO): Promise<PersonInterface>;

  update(data: UpdatePersonDTO): Promise<PersonInterface>;

  delete(data: DeletePersonDTO): Promise<string>;
}
