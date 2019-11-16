const Sequelize = require("sequelize");
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'module',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.STRING
        },
        module: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)