const dbConnection = require("../config/db");
const Sequelize = require('sequelize');
const Offices = require("../models/Offices");


const Professors = dbConnection.define(
    "Professors",
    {
        id:{
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type : Sequelize.STRING,
        },
        last_anme :{
            type: Sequelize.STRING
        }
    }
);

//1 - 1 FK in Offices table
Professors.hasOne(
    Offices, 
    {   
        as: 'Belong',
        foreignKey:'fk_proffessor',
        onDelete:'cascade', 
        onUpdate:'cascade',        
    }
); 

module.exports = Professors;