
import Login from "../Modules/Auth/Login"
import ControlPanel from "../Modules/ControPanel"
import GeneralViews from "../Modules/GeneralViews";

export default (rol:string|undefined|null) => {
  
  
  let Query:any= {
    Query:{
      Login,
      Error: () => 'No puedes pasar Query'
    }
  };

     switch (rol) {
      case "Admin":
        Query = {
          Query:{

            ControPanel: async (_:void, data:any, context:any) => ControlPanel(_, data, context),
            ...GeneralViews
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