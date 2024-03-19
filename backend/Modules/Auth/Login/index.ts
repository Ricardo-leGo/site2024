import JWTLIB from "../../../Lib/jwt";


export default async (_:void, data:any, context:any):Promise<{Token:string}| null> => {


    console.log("data", data, context);

    const Token = await  new JWTLIB().Sign(
        {
            Name:"Usuario",
            LastName:"LastName",
            Rol:"Rol",
            IdUser:1
        }

    )

    console.log(Token);

    return {Token}
}