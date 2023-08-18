import express, { Request, Response } from 'express'
import { auth } from '../middleware/auth.middleware'
import { UserController } from '../controllers/usuario.controller';
import { IUser }           from '../types/user.type';

export const UsuarioRouter = express.Router();

UsuarioRouter.post('/register', (req:Request, res:Response) => {
    const user: IUser = req.body;
    UserController.register(user)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json({'message': err}))
})

UsuarioRouter.post('/login',    (req:Request, res:Response) => {
    const user: IUser = req.body;
    UserController.login(user)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json({'message': err}))
})

UsuarioRouter.get('/', (req:Request, res:Response) => {
    res.status(200).json({"holis": "sin auth"})
})

UsuarioRouter.get('/auth', auth, (req:Request, res:Response) => {
    res.status(200).json({"holis": "con auth"})
})