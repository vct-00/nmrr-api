import http from 'http';
import express, { Express } from 'express';
import roomRouter from './routes/rooms';
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const app: Express = express();

dotenv.config()
mongoose.connect(process.env.DATABASE_URL as string)
const db = mongoose.connection
db.on('error',(error) => console.error(error))
db.once('open',() => console.log('Connected to Database'))

/** Parse the request */
app.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
app.use(express.json());

/** Routes */
app.use('/rooms', roomRouter);

/** Server */
app.listen(3000, () => console.log('Server Started'))