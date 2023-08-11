import express from 'express'
import dotenv from 'dotenv';

import { UsuarioRouter } from './routes/usuario.router';

const app = express();

dotenv.config();

app.use('/user', UsuarioRouter);

app.listen(Number(process.env.PORT), String(process.env.HOST) , () => {
    console.log(`Listening on http://${process.env.HOST}:${process.env.PORT} :D`);
});

