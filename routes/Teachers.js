//configuration of database
const express = require('express');
const teachers = express.Router();
const cors = require('cors');
const db = require('./../database/db');
const Teacher = require('../model/Teacher');

teachers.use(cors());

process.env.SECRET_KEY = 'secret';

//registering as teacher
//server/teachers/register
teachers.post('/register', (req, res) => {
    const teacherData = {
        id: req.body.id,
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    }
    Teacher.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(teacher => {

        //if a teacher do not exist the email
        if(!teacher){
            db.sequelize.query("INSERT INTO teachers (id,email,password,name) VALUES(" + "'" + teacherData.id + "'" + "," +  "'" + teacherData.email + "'" + "," + "'" + teacherData.password + "'" + "," + "'" + teacherData.name + "'" + ");", (err) => {
                res.send(err);
            });
            let status = {
                'status': 'ok' 
            };
            res.json(status);
        }

        //if a teacher exit with the email
        else{
            res.json({
                status: 'Teacher already exist!',
                teacher: teacher
            })
        }
    })

    //İf there would be any error
    .catch(err => {
        res.json({
            status: '505',
            error: err
        })
    })
})

teachers.get('/login', (req, res) => {

    //check the teacher exist with this email and password
    Teacher.findOne({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    })
    .then(teacher => {

        //if teacher exist
        if(teacher){
            res.json({
                status: '200',
                teacher: teacher
            })
        }

        //if teacher does not exist
        else{
            res.json({
                status: '404',
                teacher: 'Email or password is wrong!'
            })
        }
    })

    //İf there would be any error
    .catch(err => {
        res.json({
            status: '505',
            error: err
        })
    })
})

module.exports = teachers;

