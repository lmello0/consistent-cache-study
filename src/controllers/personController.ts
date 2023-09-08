import { Request, Response } from 'express';
import { GetAllPersonService } from '../services/GetAllPersonService';
import { CreatePersonService } from '../services/CreatePersonService';
import { UpdatePersonService } from '../services/UpdatePersonService';
import { DeletePersonService } from '../services/DeletePersonService';
import { GetPersonService } from '../services/GetPersonService';
import { NotFoundException } from '../exceptions/NotFound';

export class PersonController {
  constructor(
    private readonly getAllPersonService: GetAllPersonService,
    private readonly getPersonService: GetPersonService,
    private readonly createPersonService: CreatePersonService,
    private readonly updatePersonService: UpdatePersonService,
    private readonly deletePersonService: DeletePersonService,
  ) {}

  private handleException(err: unknown, res: Response) {
    if (err instanceof NotFoundException) {
      return res.status(404).json({ error: err.message });
    } else {
      console.error(err);

      return res.status(500).json({ error: 'Unexpected error' });
    }
  }

  async getPeople(req: Request, res: Response) {
    try {
      const people = await this.getAllPersonService.execute();

      return res.json(people);
    } catch (err) {
      console.error(err);

      return res.status(500).json({ error: 'Unexpected error' });
    }
  }

  async getPerson(req: Request, res: Response) {
    try {
      const { email } = req.params;

      const person = await this.getPersonService.execute({ email });

      return person;
    } catch (err) {
      this.handleException(err, res);
    }
  }

  async createPerson(req: Request, res: Response) {
    try {
      const { customer, firstName, lastName, age, email, address, phone } =
        req.body;

      const person = await this.createPersonService.execute({
        customer,
        firstName,
        lastName,
        age,
        email,
        address,
        phone,
      });

      return res.json(person);
    } catch (err) {
      this.handleException(err, res);
    }
  }

  async updatePerson(req: Request, res: Response) {
    try {
      const emailId = req.params.email;
      const { customer, firstName, lastName, age, email, address, phone } =
        req.body;

      const person = await this.updatePersonService.execute({
        email: emailId,
        newData: {
          customer,
          firstName,
          lastName,
          age,
          email: email,
          address,
          phone,
        },
      });

      return res.json(person);
    } catch (err) {
      this.handleException(err, res);
    }
  }

  async deletePerson(req: Request, res: Response) {
    try {
      const { email } = req.params;

      const status = await this.deletePersonService.execute({ email });

      return res.json(status);
    } catch (err) {
      this.handleException(err, res);
    }
  }
}
