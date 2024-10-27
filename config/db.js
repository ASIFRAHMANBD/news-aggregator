
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('news', 'asif', '', {
    host: 'localhost', 
    dialect: 'postgres', 
});

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, connectDb };
