const { DataTypes } = require('sequelize');
const sequelize = require('./config');

// Modèle Newsletter
const Newsletter = sequelize.define('Newsletter', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    subscriptionDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

// Modèle Quiz Score
const QuizScore = sequelize.define('QuizScore', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 6
        }
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = {
    Newsletter,
    QuizScore
};
