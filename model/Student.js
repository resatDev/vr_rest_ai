const Sequelize = require("sequelize");
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'student',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        class_id: {
            type: Sequelize.INTEGER
        },
        teacher: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)