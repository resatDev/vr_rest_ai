//configuration of database
const express = require('express');
const students = express.Router();
const cors = require('cors');
const db = require('./../database/db');
const Student = require('../model/Student');

students.use(cors());

process.env.SECRET_KEY = 'secret';

//student register router 
//server/students/register
students.post('/register', (req, res)=> {
    const userData =  {
        id: req.body.id,
        name: req.body.name,
        class_id: req.body.class_id
    };

    //Check if the student_id is exist more than one in an classroom
    Student.findOne({
        where: {
            id: req.body.id,
            class_id: req.body.class_id
        }
    })
    .then(student => {

        //If there haven't been any students record which saved with this student_id before
        if(!student){  
            db.sequelize.query("INSERT INTO students (id,name,class_id) VALUES(" + "'" + userData.id + "'" + "," +  "'" + userData.name + "'" + "," + "'" + userData.class_id + "'" + ");", (err) => {
                res.send(err);
            });
            let status = {
                'status': 'ok'
            };
            res.json(status);
            console.log(status);
        }

        //If there have been any students record which saved with this student_id before
        else{
            let error = {
                error: 'Users already Exist!',
                student: student
            };
            res.json(error);
            console.log(error);
        };
    })
});

//student information
//server/students/info
students.get('/info', (req, res) => {
    
    //Check the student is exist or not
    Student.findOne({
        where: {
            id: req.body.id
        }
    })
    .then(student => {

        //if student exist
        if(student){
            res.json({
                status: '200',
                student_info: student
            })
        }

        //if student does not exist
        else{
            res.json({
                status: '404',
                student_info: 'Student not found!'
            })
        }
    })
})


module.exports = students