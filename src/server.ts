import express from 'express';
import database from "./database";
//import { RequestHelper, ResponseHelper } from './net';

const app = express();

/* middleware */
app.use((req: any, res: any, next: any) => {
 // let _request = RequestHelper(req, res)
 // let _response = ResponseHelper(_request)
  console.log('request time: ', Date.now(), _request)
  next();
})

/* route */

const start = () => {
  app.listen(3000, () => console.log('listen port: 3000'));
}

export { start };