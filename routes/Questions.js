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

module.exports = questions;
