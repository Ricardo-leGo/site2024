import  gql  from 'graphql-tag';
import Login from './Login';
import Error from './Error';

export const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`

export default [
  linkSchema, 
  Login, Error
 ]