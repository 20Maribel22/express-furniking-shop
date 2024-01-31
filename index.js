/* eslint-disable import/extensions */
import * as dotenv from 'dotenv';
import express from 'express';
import { cors } from './middlewares/cors.js';
import connectDataBase from './utils/MongoDb.js';
import ImportData from './DataImport.js';
import indexRouter from './routes/indexRouter.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import { errorHandler } from './middlewares/error.js';
import { limiter } from './middlewares/limiter.js';

dotenv.config();
connectDataBase();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors);
app.use(express.json());
app.use(requestLogger);
app.use(limiter);
app.use('/import', ImportData);
app.use(indexRouter);
app.use(errorLogger);
app.use(errorHandler);

// eslint-disable-next-line consistent-return
app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server Ok');
});
