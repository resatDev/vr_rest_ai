//configuration of database
const express = require('express');
const modules = express.Router();
const cors = require('cors');
const db = require('./../database/db');
const Module = require('../model/Module');

modules.use(cors());

process.env.SECRET_KEY = 'secret';

//adding new module 
//server/modules/add
modules.post('/add', (req, res)=> {
    const moduleData =  {
        id: req.body.id,
        user_id: req.body.user_id,
        module: req.body.module,
        date: req.body.date
    };

    //Check if the module exist or not
    Module.findOne({
        where: {
            module: req.body.module
        }
    })
    .then(module => {
        
        //if module does not exist current database add the new
        if(!module){
            db.sequelize.query("INSERT INTO modules (id,user_id,module,date) VALUES(" + "'" + moduleData.id + "'" + "," + "'" + moduleData.user_id + "'" + "," + "'" + moduleData.module + "'" + "," + "'" + moduleData.date + "'" + ");", (err) => {
                res.send(err);
            });
            res.json({
                status: '200',
                moduleStatus: 'Successfully added!'
            })
        }

        //if module exist in the database 
        else{
            res.json({
                status: '404',
                moduleStatus: 'Module is already exist!'
            })
        }
    })

    //if an error occur
    .catch(err => {
        res.json({
            status: '505',
            error: err
        })
    })
});

//module list
//server/modules/list

modules.get('/list', (req, res) => {

    //check the current user have modules or not 
    Module.findAll({
        where : {
            user_id: req.body.user_id
        }
    })
    .then(modules => {

        //if modules exist
        if(modules){
            res.json({
                status: '200',
                modules: modules
            })
        }

        //if user do not has any modules 
        else{
            res.json({
                status: '404',
                modules: 'Modules not found!'
            })
        }
    })

})

module.exports = modules;