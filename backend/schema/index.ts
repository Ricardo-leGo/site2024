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

console.log(rol, " rol typedefs ");
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
           console.log("Client");
        
        break;
      case undefined:
          typedefs= [
            linkSchema, 
            Login, 
            Error
           ] ;
           console.log("undefined");
        
        break;
    default:
    typedefs = [
      linkSchema, 
      Login, 
      Error
     ];
      break;
  }
//console.log( JSON.stringify(typedefs, null, 2) );
  return typedefs;
}

