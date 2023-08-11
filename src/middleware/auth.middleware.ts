import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'

export async function auth(req:Request, res:Response, next:NextFunction) {
    
    const token = req.headers['authorization'];

    try {
        if (!token) throw new Error('Token not found');

        const secret_key = process.env.SECRET_KEY;

        const decoded = jwt.verify(token, secret_key || 'invalid_key');

        next();
        
    } catch (err) {
        res.status(401).send('Token no autorizado');
    }
}