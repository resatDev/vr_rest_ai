//configuration of database
const express = require('express');
const questions = express.Router();
const cors = require('cors');
const db = require('../database/db');
const Question = require('../model/Question');

questions.use(cors());

process.env.SECRET_KEY = 'secret';

//adding questions to exam
//server/questions/add
questions.post('/add', (req, res) => {
   
    //getting data
    questionData = {
        id: req.body.id,
        exam: req.body.exam,
        qtext: req.body.qtext,
        qanswers: req.body.qanswers,
        qgrade: req.body.qgrade
    }

    //adding the new question
    db.sequelize.query("INSERT INTO questions (id,exam,qtext,qanswers,qgrade) VALUES(" + "'" + questionData.id + "'" + "," +  "'" + questionData.exam + "'" + "," + "'" + questionData.qtext + "'" + "," + "'" + questionData.qanswers + "'" + "," + "'" + questionData.qgrade + "'" + ");", (err) => {
        res.send(err);
    });
    let status = {
        'status': 'ok' 
    };
    res.json(status);

})

//getting quetions from exam
//server/questions/get
questions.get('/get', (req, res) => {

    //check the existance of exam
    Question.findAll({
        exam: req.body.exam
    })
    .then(questions => {

        //if exam exist
        if(questions){
            res.json({
                status: '200',
                questions: questions
            })
        }

        //if exam does not exist
        else{
            res.json({
                status: '404',
                questions: 'There is no question in this exam or exam does not exist!'
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


module.exports = questions;
