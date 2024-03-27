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
import { TypeSource, IResolvers } from '@graphql-tools/utils';
import { MicroRequest } from 'apollo-server-micro/dist/types';

export interface IUser{
  
  Name    :string | null
  LastName:string | null
  Rol     :string | null
  IdUser  :number | null
}
interface ILocalContext{

    User?:IUser | null,
    token:string | undefined | null,
    msg?:string, 

}

 interface IContexto {
 contexto:ILocalContext
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


const User:Function | null = (token:string=""):IUser => new JWTLIB().decodeToken( token );
const VerifyToken = (token:string)   => new JWTLIB()     .Verify( token );

const context:Function = (req:MicroRequest):IContexto | undefined => {

  const  token:string | null = req.headers.authorization ?? "";
  const {msg, ValidToken}:IValidToken = VerifyToken( token ); 

  let contexto:ILocalContext | null= null;

  if(ValidToken){

    contexto = {
      token,
      User: <IUser>User( token )
    }
    console.log(contexto.User);
    return {
      typeDefs:typeDefs( contexto.User?.Rol as string ),
      resolvers:Query( contexto.User?.Rol),
      contexto,
    }

  }
  
  
  if(!ValidToken){

    contexto = {
      token:null,
      User: null
    }

    return {
      typeDefs:typeDefs(undefined),
      resolvers:Query( undefined ),
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


