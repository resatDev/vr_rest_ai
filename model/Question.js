const Sequelize = require("sequelize");
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'question',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        exam: {
            type: Sequelize.STRING
        },
        qtext: {
            type: Sequelize.STRING
        },
        qanswers: {
            type: Sequelize.STRING
        },
        qgrade: {
            type: Sequelize.STRING
        },
    },
    {
        timestamps: false
    }
)