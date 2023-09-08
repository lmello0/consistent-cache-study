import { CreatePersonDTO } from '../dtos/CreatePersonDTO';
import { DeletePersonDTO } from '../dtos/DeletePersonDTO';
import { GetPersonDTO } from '../dtos/GetPersonDTO';
import { UpdatePersonDTO } from '../dtos/UpdatePersonDTO';
import { NotFoundException } from '../exceptions/NotFound';
import { PersonInterface } from '../interfaces/IPerson';
import { Person } from '../models/Person';
import { MongoRepositoryProtocol } from './MongoRepositoryProtocol';

export class MongoRepository implements MongoRepositoryProtocol {
  async findAll(): Promise<PersonInterface[]> {
    return await Person.find().select('-_id');
  }

  async findOne(data: GetPersonDTO): Promise<null | PersonInterface> {
    const person = await Person.findOne({ email: data.email }).select('-_id');

    if (!person) {
      throw new NotFoundException();
    }

    return person;
  }

  async create(data: CreatePersonDTO): Promise<PersonInterface> {
    const person = new Person(data);

    await person.save();

    return person;
  }

  async update(data: UpdatePersonDTO): Promise<PersonInterface> {
    const person = await Person.findOneAndUpdate(
      { email: data.email },
      data.newData,
      { new: true },
    );

    if (!person) {
      throw new NotFoundException();
    }

    await person.save();

    return person;
  }

  async delete(data: DeletePersonDTO): Promise<string> {
    const person = await Person.findOneAndDelete({ email: data.email });

    if (!person) {
      throw new NotFoundException();
    }

    return `${data.email} deleted!`;
  }
}
