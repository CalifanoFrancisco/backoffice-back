import jwt    from 'jsonwebtoken'
//import fetch  from 'node-fetch'
import bcrypt from 'bcrypt';

// user
import { IUser } from '../types/user.type';

// env
const URL  = `${process.env.BACKEND_URL}/users`;
const SALT = Number(process.env.SALT) || 0;

// controller
export class UserController {

    public static register(user:IUser): Promise<any> {
        return new Promise((resolve, reject) => {
            
            bcrypt.hash(user.password, SALT)
            .then(pass => {
                user.password = pass;
                fetch(
                    `${URL}`, 
                    {
                        method: 'POST',
                        body: JSON.parse(JSON.stringify(user)),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                .then(data => resolve(data))
                .catch(err => reject(err));
            })
            .catch(err => reject(err));

        });
    }

    public static login(user:IUser): Promise<any> {
        return new Promise((resolve, reject) => {            
           
            fetch(
                `${URL}/${user.id}/password`, 
                { method: 'GET' }
            )
            .then(res => {
                bcrypt.hash(user.password, SALT)
                .then(iPass => {
                    const resJson = JSON.parse(JSON.stringify(res.body));
                    if (iPass == resJson['password']) {
                        resolve(this.getToken(user));
                    } else {
                        reject(new Error('Incorrect password'))
                    }
                })
                .catch(err => reject(err));
            })
            .catch(err => reject(err));
        })
    }

    private static getToken(user:IUser) {
        return jwt.sign(
            user,
            process.env.SECRET_KEY || '',
            {
                expiresIn: 999999
            }
        );
    }
}