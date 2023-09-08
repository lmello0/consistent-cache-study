import { CreatePersonDTO } from '../dtos/CreatePersonDTO';
import { DeletePersonDTO } from '../dtos/DeletePersonDTO';
import { UpdatePersonDTO } from '../dtos/UpdatePersonDTO';
import { NotFoundException } from '../exceptions/NotFound';
import { PersonInterface } from '../interfaces/IPerson';
import { Person } from '../models/Person';
import { MongoRepositoryProtocol } from './MongoRepositoryProtocol';

export class MongoRepository implements MongoRepositoryProtocol {
  async findAll(): Promise<PersonInterface[]> {
    return await Person.find();
  }

  async findOne(email: string): Promise<null | PersonInterface> {
    return await Person.findOne({ email });
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
      throw new NotFoundException('Person with the given email not found!');
    }

    await person.save();

    return person;
  }

  async delete(data: DeletePersonDTO): Promise<string> {
    const person = await Person.findOneAndDelete({ email: data.email });

    if (!person) {
      throw new NotFoundException('Person with the given email not found!');
    }

    return `${data.email} deleted!`;
  }
}
