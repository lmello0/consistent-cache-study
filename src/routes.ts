import { Request, Response, Router } from 'express';
import { personController } from './controllers';

const router = Router();

router.get('/people', (req: Request, res: Response) => {
  return personController.getPeople(req, res);
});

router.get('/person/:email', (req: Request, res: Response) => {
  return personController.getPerson(req, res);
});

router.post('/person', (req: Request, res: Response) => {
  return personController.createPerson(req, res);
});

router.put('/person/:email', (req: Request, res: Response) => {
  return personController.updatePerson(req, res);
});

router.delete('/person/:email', (req: Request, res: Response) => {
  return personController.deletePerson(req, res);
});

export { router };
