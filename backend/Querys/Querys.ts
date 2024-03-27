
import Login from "../Modules/Auth/Login"
import ControlPanel from "../Modules/ControPanel"

export default (rol:string|undefined|null) => {
  
  
  let Query:any= {
    Query:{
      Login,
      Error: () => 'No puedes pasar Query'
    }
  };
  console.log(rol, " rol querys ");

     switch (rol) {
   
      case "Admin":
        Query = {
          Query:{

            ControPanel: async (_:void, data:any, context:any) => ControlPanel(_, data, context)
          }
        }
        break;
        case undefined:
          Query = {
            Query:{
              Login: async (_:void, data:any, context:any) => ( await Login(_, data, context)),
              Error: () => 'No puedes pasar undefined'
            }
          }
          break;
      default:     
      Query = {
        Query:{
          Login,
          Error: () => 'No puedes pasar'
        }
      }
        break;
    }


  return Query

  }