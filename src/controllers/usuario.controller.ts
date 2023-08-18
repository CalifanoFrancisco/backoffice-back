import jwt    from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'

dotenv.config();

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
                .then(res  => resolve(res))
                .catch(err => reject(err));
            })
            .catch(err => reject(err));

        });
    }

    public static login(user:IUser): Promise<any> {
        return new Promise((resolve, reject) => {

            // get user password
            fetch(
                `${URL}/${user.id}/password`,       
                { method: 'GET' }
            )
            .then(res => {

                // hash input password
                bcrypt.hash(user.password, SALT)    
                .then(iPass => {

                    // jsonify body
                    const resJson = JSON.parse(JSON.stringify(res.body));   

                    // compare db-password with input-hash-password
                    if (iPass == resJson['password']) {                     
                        const token = this.getToken(user);                  
                        console.log(`Token: ${token}`)  //debugging
                        resolve(token);  
                        return;                     
                    }

                    reject(new Error('Incorrect password'));
                })
                .catch(err => reject(err));

            })
            .catch(err => {
                console.log(`Error fetching: ${URL}/${user.id}/password { GET }`);
                reject(err)
            });
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

    public static getUser(id:string):Promise<IUser | null> {
        return new Promise ((resolve, reject) => {
            fetch(
                `${URL}/${id}`,
                { method: 'GET' }
            )
            .then(res => {
                const resJson = JSON.parse(JSON.stringify(res.body))
            })

        })
       
    }
}