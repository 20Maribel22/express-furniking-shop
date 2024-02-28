import mongoose from 'mongoose';
// eslint-disable-next-line import/extensions
// import { MONGO_URL } from './config.js';

const connectDataBase = async () => {
  try {
    // eslint-disable-next-line no-unused-vars
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('Mongo Connected');
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDataBase;
