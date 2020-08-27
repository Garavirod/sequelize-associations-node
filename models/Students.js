const Sequelize = require('sequelize');
const dbConnection = require('../config/db');
const Classes = require('./Classes');


const Students = dbConnection.define(
    "Students",
    {
        uid: {
            type: Sequelize.UUID,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
        },
        last_name:{
            type: Sequelize.STRING,
        }
    }
)

// N - M Creates a new table FK Students and FK Groups
Students.belongsToMany(
    Classes, 
    {        
        through:'Students_Groups', 
        onDelete:'cascade', 
        onUpdate:'cascade',
    }
);
module.exports = Students;
