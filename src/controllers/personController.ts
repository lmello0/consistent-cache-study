import { Request, Response } from 'express';
import { GetAllPersonService } from '../services/GetAllPersonService';
import { CreatePersonService } from '../services/CreatePersonService';
import { UpdatePersonService } from '../services/UpdatePersonService';
import { DeletePersonService } from '../services/DeletePersonService';
import { GetPersonService } from '../services/GetPersonService';
import { NotFoundException } from '../exceptions/NotFound';
import { RedisRepositoryProtocol } from '../repositories/RedisRepositoryProtocol';

export class PersonController {
  constructor(
    private readonly getAllPersonService: GetAllPersonService,
    private readonly getPersonService: GetPersonService,
    private readonly createPersonService: CreatePersonService,
    private readonly updatePersonService: UpdatePersonService,
    private readonly deletePersonService: DeletePersonService,
    private readonly cache: RedisRepositoryProtocol,
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
      const { customer } = req.params;

      const key = `${customer}:${req.originalUrl}`;
      const data = await this.cache.get(key);

      if (data) {
        return res.json(data);
      }

      const people = await this.getAllPersonService.execute({ customer });

      this.cache.store(key, people);

      return res.json(people);
    } catch (err) {
      this.handleException(err, res);
    }
  }

  async getPerson(req: Request, res: Response) {
    try {
      const { customer, email } = req.params;

      const key = `${customer}:${email}:${req.originalUrl}`;
      const data = await this.cache.get(key);

      if (data) {
        return res.json(data);
      }

      const person = await this.getPersonService.execute({ customer, email });

      if (person) {
        this.cache.store(key, person);
      }

      return res.json(person);
    } catch (err) {
      this.handleException(err, res);
    }
  }

  async createPerson(req: Request, res: Response) {
    try {
      const newData = { ...req.body };

      const person = await this.createPersonService.execute(newData);

      this.cache.updateCache(newData.customer, newData.email, {
        originalUrl: req.originalUrl,
        person: newData,
      });

      return res.json(person);
    } catch (err) {
      this.handleException(err, res);
    }
  }

  async updatePerson(req: Request, res: Response) {
    try {
      const emailId = req.params.email;
      const newData = { ...req.body };

      const person = await this.updatePersonService.execute({
        email: emailId,
        newData,
      });

      this.cache.updateCache(newData.customer, emailId, {
        originalUrl: req.originalUrl,
        person: newData,
      });

      return res.json(person);
    } catch (err) {
      this.handleException(err, res);
    }
  }

  async deletePerson(req: Request, res: Response) {
    try {
      const { customer, email } = req.params;

      const status = await this.deletePersonService.execute({ email });

      this.cache.updateCache(customer, email, { originalUrl: req.originalUrl });

      return res.json(status);
    } catch (err) {
      this.handleException(err, res);
    }
  }
}
