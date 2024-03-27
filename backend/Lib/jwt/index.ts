import { IUser } from '@/pages/api/graphql';
import { secret } from '../constants';
import jwt from 'jsonwebtoken';

import {AuthenticationError } from 'apollo-server-micro';

export default class JWTLIB {
    static verificadordeExport: string;

    constructor(){}
    secretKey:string = secret.toString();

    Sign = async  (data:any) =>{ return jwt.sign( await data, this.secretKey,{ expiresIn: 60 * 60 * 2 })};

    Verify = (token:string="") :{msg?:string, ValidToken?:boolean, AutenticationError?:AuthenticationError} => {
        try {
             jwt.verify(token, this.secretKey); 

             return {msg:`Bienvenido.`,ValidToken:true};

        } catch( error:any ){
            if(error.name == 'TokenExpiredError') return  {AutenticationError:new AuthenticationError("El token ha expirado")};
            return  {AutenticationError:new AuthenticationError("El token es inválido")};
        }
 
    }

    decodeToken = (token:string):any =>jwt.decode(token);


};