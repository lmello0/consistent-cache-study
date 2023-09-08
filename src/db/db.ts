import mongoose from 'mongoose';

const dbURI = process.env.MONGODB_URL || '';

export async function run() {
  try {
    await mongoose.connect(dbURI);

    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);

    process.exit(1);
  }
}
