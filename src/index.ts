import express from 'express'
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import { UsuarioRouter } from './routes/usuario.router';

const app = express();

dotenv.config();

app.use(bodyParser.json())

app.use('/user', UsuarioRouter);

app.listen(Number(process.env.PORT), String(process.env.HOST) , () => {
    console.log(`Deployed on --> http://${process.env.HOST}:${process.env.PORT} `);
    console.log(`API-Back url -> ${process.env.BACKEND_URL}`)
});

/*
.env 

SECRET_KEY=""
BACKEND_URL=""
SALT=""
PORT=
HOST=

*/
