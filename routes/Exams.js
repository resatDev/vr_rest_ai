//configuration of database
const express = require('express');
const exams = express.Router();
const cors = require('cors');
const db = require('./../database/db');
const Exam = require('../model/Exam');

exams.use(cors());

process.env.SECRET_KEY = 'secret';

//adding new exam 
//server/exams/add
exams.post('/add', (req, res) => {
    examData = {
        id: req.body.id,
        teacher: req.body.teacher,
        module: req.body.module
    }

    //adding the new exam
    db.sequelize.query("INSERT INTO exams (id,teacher,module) VALUES(" + "'" + examData.id + "'" + "," +  "'" + examData.teacher + "'" + "," + "'" + examData.module + "'" + ");", (err) => {
        res.send(err);
    });
    let status = {
        'status': 'ok' 
    };
    res.json(status);
})

//adding new exam 
//server/exams/add
exams.get('/get', (req,res) => {

    //getting the teacher
    Exam.findAll({
        teacher: req.body.teacher
    })
    .then(exam => {

        //if teacher have some exams
        if(exam){
            res.json({
                status: '200',
                exam: exam
            })
        }

        //if teacher does not have any exams
        else{
            res.json({
                status: '404',
                exam: 'There is no exam!'
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

module.exports = exams;