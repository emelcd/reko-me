import express from 'express';
import morgan from 'morgan';
import apiRouter from './routes';

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

export default app;
