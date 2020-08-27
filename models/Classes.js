const dbConnection = require("../config/db");
const { Sequelize } = require("sequelize");
const Professors = require("./Professor");

const Classes = dbConnection.define(
    "Classes",
    {
        uid: {
            type: Sequelize.UUID,
            primaryKey: true,
        }
    }
);
Professors.hasMany(
    Classes, 
    { 
        as: 'Asociado', 
        foreignKey: 'fk_professor', 
        onDelete: 'cascade', 
        onUpdate: 'cascade' 
    }
);

module.exports = Classes;