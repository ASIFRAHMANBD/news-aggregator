


const express = require('express');
const { sequelize, connectDb } = require('./config/db');
const cron = require('./cron');
const articleRoutes = require('./routes/articles');
const {fetchArticles } = require('./services/fetchArticles');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/articles', articleRoutes);

app.get('/articles/new', (req, res) => {
    res.render('createArticle'); 
});

const startServer = async () => {
    await connectDb();
    sequelize.sync().then(() => {
        app.listen(PORT, async () => {
            console.log(`Server is running on port ${PORT}`);
            await fetchArticles();
        });
    }).catch(err => {
        console.error('Error syncing the database:', err);
    });
};

startServer();

