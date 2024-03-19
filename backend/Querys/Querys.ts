
import Login from "../Modules/Auth/Login"

export default (rol:string|undefined) => {
  
  
  let Query= {
    Query:{
      Login,
      Error: () => 'No puedes pasar Query'
    }
  };

     switch (rol) {
   
      case undefined:
        Query = {
          Query:{
            Login,
            Error: () => 'No puedes pasar undefined'
          }
        }

        break;
      default:     
      Query = {
        Query:{
          Login:async () =>  (null),
          Error: () => 'No puedes pasar'
        }
      }
        break;
    }


  return Query

  }