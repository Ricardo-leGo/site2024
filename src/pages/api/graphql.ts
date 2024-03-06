/* eslint-disable */
import { ApolloServer } from 'apollo-server-micro';
/* eslint-enable */

import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import { send } from 'micro';
import Query  from '../../../backend/Querys/Querys';
import microCors from 'micro-cors'; // Importa micro-cors
import typeDefs from '../../../backend/schema'
import { RequestContext } from 'next/dist/server/base-server';
import JWTLIB from '../../../backend/Lib/jwt';
import  {JwtPayload} from 'jsonwebtoken';

interface contexto {
  User?:string | JwtPayload | null,
  token:string | undefined,
  msg?:string
}

interface IValidToken{
  msg:string,
  ValidToken:boolean
}

const resolvers = {
  Query: {...Query }
};

const UserfromToken = (token:string=""):any    => new JWTLIB().decodeToken( token );
const VerifyToken = (token:string)   => new JWTLIB()     .Verify( token );

const context= ({req}:RequestContext):contexto => {
  const  token = req.headers.authorization ?? "";
  const {msg, ValidToken}:IValidToken = VerifyToken( token ); 

  if(ValidToken){

    return {
      token,
      User:UserfromToken( token )
    }
  }else{
    return {
      token:undefined,
      User:null,
      msg:"Se necesitan credenciales"+ " \n " +`${msg}`

    }
  }

}

const apolloServer = new ApolloServer({ typeDefs, resolvers, context });
const startServer = apolloServer.start();

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
  async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'OPTIONS') {
    return await send(res, 200, 'OK');
  }
/* eslint-enable */

  try {
    await startServer;
    await apolloServer.createHandler({
      path: '/api/graphql',
    })(req, res);
  } catch (error) {
    console.error('Error starting Apollo Server:', error);
    send(res, 500, 'Internal Server Error');
  }
});
