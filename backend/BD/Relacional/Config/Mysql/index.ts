import { Sequelize } from "sequelize";

export 
default (
    host    :string,
    databse :string, 
    username:string, 
    pass    :string
    ) => new Sequelize(
        databse,
        username,
        pass
        {
        host,
        dialect:'mysql',
        logging:false
    });