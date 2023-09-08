import express from 'express';
import { router } from './routes';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(router);

export { app };
