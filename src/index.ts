import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import { config } from 'dotenv';
import mongoose from 'mongoose';

config();

const app = express();

// authentication
app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log(`Server running on http://localhost:8080/`);
});

const MONGO_URL = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@boilerplate.axivy.mongodb.net/`;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

// mongoose 연결 확인용
mongoose.connection.once('open', () => {
  console.log('connected to MongoDB');
});
