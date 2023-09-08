import { Request, Response } from 'express';
import { GetAllPersonService } from '../services/GetAllPersonService';
import { CreatePersonService } from '../services/CreatePersonService';
import { UpdatePersonService } from '../services/UpdatePersonService';
import { DeletePersonService } from '../services/DeletePersonService';

export class PersonController {
  constructor(
    private readonly getAllPersonService: GetAllPersonService,
    private readonly createPersonService: CreatePersonService,
    private readonly updatePersonService: UpdatePersonService,
    private readonly deletePersonService: DeletePersonService,
  ) {}

  async getPeople(req: Request, res: Response) {
    try {
      const people = await this.getAllPersonService.execute();

      return res.json(people);
    } catch (err) {
      console.error(err);

      return res.status(500).json({ error: 'Unexpected error' });
    }
  }

  async createPerson(req: Request, res: Response) {
    try {
      const { firstName, lastName, age, email, address, phone } = req.body;

      const person = await this.createPersonService.execute({
        firstName,
        lastName,
        age,
        email,
        address,
        phone,
      });

      return res.json(person);
    } catch (err) {
      console.error(err);

      return res.status(500).json({ error: 'Unexpected error' });
    }
  }

  async updatePerson(req: Request, res: Response) {
    try {
      const emailId = req.params.email;
      const { firstName, lastName, age, email, address, phone } = req.body;

      const person = await this.updatePersonService.execute({
        email: emailId,
        newData: { firstName, lastName, age, email: email, address, phone },
      });

      return res.json(person);
    } catch (err) {
      console.error(err);

      return res.status(500).json({ error: 'Unexpected error' });
    }
  }

  async deletePerson(req: Request, res: Response) {
    try {
      const { email } = req.params;

      const status = await this.deletePersonService.execute({ email });

      return res.json(status);
    } catch (err) {
      console.error(err);

      return res.status(500).json({ error: 'Unexpected error' });
    }
  }
}
