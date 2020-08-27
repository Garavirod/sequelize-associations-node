const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dbConnection = require('./config/db');
const routes = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/**
 * Data base connection
 */
try{
    dbConnection.authenticate();
    console.log("DB connection succesfull");
}catch(err){
    console.log("DB connection worng >: ", err);
}

/**
 * Routes
 */

// app.use('/',(req,res)=>{
//     res.send("RELATIONS SEQUELIZE WORKS!!");
// });

app.use('/api-sequelize', routes);



/**
 * Settings port
 */

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), ()=>{
    console.log("Aplication running in port ",app.get('port'));
});