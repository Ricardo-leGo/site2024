import * as         dotenv          from 'dotenv';
dotenv.config();
console.log(

  process.env.SECRET_KEYBackend,
  

);
/* eslint-disable */
import { ApolloServer, AuthenticationError, Config } from 'apollo-server-micro';
/* eslint-enable */

import { PageConfig } from 'next';
import { send } from 'micro';
import Query  from '../../../backend/Querys/Querys';
import microCors from 'micro-cors'; // Importa micro-cors
import typeDefs from '../../../backend/schema'
import JWTLIB from '../../../backend/Lib/jwt';
import  {JwtPayload} from 'jsonwebtoken';
import { TypeSource, IResolvers } from '@graphql-tools/utils';
import { MicroRequest } from 'apollo-server-micro/dist/types';

// interface IContexto {
//   User?:string | JwtPayload | null,
//   token:string | undefined,
//   msg?:string
// }


 interface IContexto {
 contexto:{
   User?:string | JwtPayload | null,
   token:string | undefined,
   msg?:string, 
  }  
   resolvers:{
     Query:IResolvers
   },
   typeDefs:TypeSource | undefined
 }

interface IValidToken{
  msg?:string,
  ValidToken?:boolean
  AutenticationError?:AuthenticationError
}
export interface IUser{
  
  Name:string
  LastName:string
  Rol:string
  IdUser:number
}

// const resolvers = {
//   ...Query
// };


const User:Function = (token:string=""):IUser => new JWTLIB().decodeToken( token );
const VerifyToken = (token:string)   => new JWTLIB()     .Verify( token );

const context:Function = (req:MicroRequest):IContexto | undefined => {

  const  token = req.headers.authorization ?? "";
  const {msg, ValidToken}:IValidToken = VerifyToken( token ); 

  const contexto = {
    token,
    User: <IUser>User( token )
  }

  console.log(contexto);

  if(ValidToken){


    return {
      typeDefs,
      resolvers:Query( contexto?.User?.Rol),
      contexto,
    }

  }
  
  
  if(!ValidToken){

    return {
      typeDefs,
      resolvers:Query( contexto?.User?.Rol),
      contexto,
    }
  }

}

const apolloServer = async function(req:MicroRequest){


  return new ApolloServer( <Config<any>>context( req ) );
}

const cors = microCors({
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['*'],
  origin: '*',
  allowCredentials: true,
});


export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

/* eslint-disable */
export default cors(
  async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return await send(res, 200, 'OK');
  }
/* eslint-enable */
const ServerStarted = await apolloServer(req);
try {
  
  await ServerStarted.start();
      
   await ServerStarted.createHandler({
      path: '/api/graphql',
    })(req, res);


  } catch (error) {
    console.error('Error starting Apollo Server:', error);
    send(res, 500, 'Internal Server Error');
  }
});


