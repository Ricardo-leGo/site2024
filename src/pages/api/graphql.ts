
import { ApolloServer, gql } from 'apollo-server-micro';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import { send } from 'micro';
import Query  from '../../../backend/Querys/Querys';
import microCors from 'micro-cors'; // Importa micro-cors
import typeDefs from '../../../backend/schema'

const resolvers = {
  Query: {...Query }
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
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
export default cors(async function handler(req: NextApiRequest, res: NextApiResponse) {
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
