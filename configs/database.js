'use strict';
import { basename as _basename } from 'path';
import Sequelize from 'sequelize';
import { dbConfig } from "./../configs/index.js";


let sequelize;
if (dbConfig.use_env_variable) {
    sequelize = new Sequelize(process.env[dbConfig.use_env_variable], dbConfig);
} else {
    sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
}

export default sequelize;