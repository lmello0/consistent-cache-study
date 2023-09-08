import 'dotenv/config';
import { redis } from './db/redis';
import mongoose from 'mongoose';
import { run } from './db/db';
import { app } from './app';

async function exit() {
  try {
    await redis.quit();
    console.log('Connection with Redis, finished');

    await mongoose.connection.close();
    console.log('Connection with MongoDB, finished');

    console.log('All connections cleared');
  } catch (err) {
    console.error(err);

    process.exit(1);
  } finally {
    console.log('Exiting application');

    process.exit(1);
  }
}

run()
  .then(async () => {
    try {
      await redis.connect();
      console.log('Connected to Redis');
    } catch (err) {
      console.error(err);
      await exit();
    }

    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
      console.log(`Server online on ${port}`);
    });

    process.on('SIGINT', async () => {
      console.warn('SIGINT received, shutting down the server');

      await new Promise((resolve) => server.close(resolve));
      console.log('Server closed!');

      await redis.quit();
      console.log('Connection with Redis finished');

      await mongoose.connection.close();
      console.log('Connection with Mongo finished');

      console.log('Application finished');
      process.exit();
    });
  })
  .catch(() => {
    exit();
  });
