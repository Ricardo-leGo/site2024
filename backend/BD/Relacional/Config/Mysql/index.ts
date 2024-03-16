import { Sequelize } from "sequelize";

export const MysqSequelize = (
    
    host    :string,
    database :string, 
    username:string, 
    pass    :string

    ) => new Sequelize(
        database,
        username,
        pass,
        {

        host,
        dialect:'mysql',
        logging:false

    });




    // export const  MySqlConnection = () => MysqSequelize(

    //     process.env.HOSTMYSQL,
    //     data
    // )


