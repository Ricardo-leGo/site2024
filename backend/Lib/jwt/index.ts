import { secret } from '../constants';
import  *  as jwt from 'jsonwebtoken';


export default class JWTLIB {
    static verificadordeExport: string;

    constructor(){}
    secretKey:string = secret.toString();

    Sign = async  (data:any) =>{return   jwt.sign( await data, this.secretKey,{ expiresIn: 60 * 60 * 2 })};

    Verify = (token:string="")=> {
        try {
             jwt.verify(token, this.secretKey); 

             return {msg:`El token es válido, bienvenido.`,ValidToken:true};
        } catch( e ){

             return {msg: `EL token es inválido. ${e}`, ValidToken:false}
        }
 
    }

    decodeToken = (token:string) =>jwt.decode(token);


};