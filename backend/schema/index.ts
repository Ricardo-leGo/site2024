import  gql  from 'graphql-tag';
import Login from './Login';
import Error from './Error';
import ControPanel from './ControPanel';

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

export default  (rol:string| undefined) => 
{
  let typedefs =[linkSchema];

  switch (rol) {
    case "Admin":
        typedefs= [
          linkSchema, 
          ControPanel
         ]; 
      break;
      case "Cliente":
          typedefs= [
            linkSchema,
            Login
           ] ;
        
        break;
      case undefined:
          typedefs= [
            linkSchema, 
            Login, 
            Error
           ] ;
        
        break;
    default:
    typedefs = [
      linkSchema, 
      Login, 
      Error
     ];
      break;
  }
  return typedefs;
}

