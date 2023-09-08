import { GetAllPersonService } from '../services/GetAllPersonService';
import { MongoRepository } from '../repositories/MongoRepository';
import { PersonController } from './personController';
import { CreatePersonService } from '../services/CreatePersonService';
import { UpdatePersonService } from '../services/UpdatePersonService';
import { DeletePersonService } from '../services/DeletePersonService';

const mongoRepository = new MongoRepository();

const getAllPersonService = new GetAllPersonService(mongoRepository);
const createPersonService = new CreatePersonService(mongoRepository);
const updatePersonService = new UpdatePersonService(mongoRepository);
const deletePersonService = new DeletePersonService(mongoRepository);

const personController = new PersonController(
  getAllPersonService,
  createPersonService,
  updatePersonService,
  deletePersonService,
);

export { personController };
