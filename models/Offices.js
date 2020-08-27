const dbConnection = require("../config/db");
const { Sequelize } = require("sequelize");

const Offices = dbConnection.define(
    "Offices",
    {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false
        },
        description :{
            type: Sequelize.STRING
        }   
    }
);
module.exports = Offices;