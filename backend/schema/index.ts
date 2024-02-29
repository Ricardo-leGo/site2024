import  gql  from 'graphql-tag';
import hello from './hello';
import Login from './Login';

export const linkSchema = gql`
  type Query {
    _: Boolean
    nuevaquery:String
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
  Login
 ]