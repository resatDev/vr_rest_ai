const Sequelize = require("sequelize");
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'exam',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        teacher: {
            type: Sequelize.STRING
        },
        module: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)