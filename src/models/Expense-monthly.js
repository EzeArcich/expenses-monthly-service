const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ExpenseMonthly = sequelize.define('Expense', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

module.exports = ExpenseMonthly;
