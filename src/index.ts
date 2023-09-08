import { config } from 'dotenv';
config();

import express from 'express';
import { router } from './routes';
import { run } from './db/db';
import morgan from 'morgan';

run();
const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
