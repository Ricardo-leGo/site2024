import JWTLIB from "../../../Lib/jwt";

export default async (_:void, data:any, context:any):Promise<{Token:string | undefined}> => {

    console.log("data", data, context);

    let Token:string|undefined|null
    if(data.UserLogin.User="Ricardo" && data.UserLogin.Password=="123456"){

      Token = await  new JWTLIB().Sign(
            {
                Name:"Ricardo",
                LastName:"Leyva Gonzalez",
                Rol:"Admin",
                IdUser:1
            }
        );
        
    }

    console.log(Token);

    return {Token:Token??""}
}