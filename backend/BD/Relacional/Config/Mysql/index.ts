import { Sequelize } from "sequelize";

export const MysqlConecctio = (
    
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



