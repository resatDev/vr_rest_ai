const Sequelize = require("sequelize");
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'teacher',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)