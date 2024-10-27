const { Article, Topic } = require('../models');
const extractAndSaveTopics = require('../utils/topicExtractor'); 


const { Op } = require('sequelize'); 
const { sequelize } = require('../models');

exports.getAllArticles = async (req, res) => {
    const { keyword, date, topic } = req.query;
    let query = `
        SELECT DISTINCT articles.* 
        FROM articles
        LEFT JOIN topics ON articles.id = topics.article_id
        WHERE 1=1`; 

    const replacements = [];

    if (topic) {
        query += ` AND topics.name = ?`;
        replacements.push(topic);
    }

    if (keyword) {
        query += ` AND articles.title ILIKE ?`;
        replacements.push(`%${keyword}%`);
    }

    if (date) {
        const inputDate = new Date(date);
        query += ` AND publication_date::date = ?`;
        replacements.push(inputDate.toISOString().split('T')[0]);
    }

    try {
        const articles = await sequelize.query(query, {
            replacements,
            type: sequelize.QueryTypes.SELECT,
        });

        console.log("Fetched Articles:", articles);
        const topics = await Topic.findAll();
        res.render('articles', { articles, topics });
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).render('error', {
            message: "There was an error retrieving the articles. Please try again later."
        });
    }
};




exports.createArticle = async (req, res) => {
    try {
        const articleData = {
            title: req.body.title,
            description: req.body.description,
            publication_date: new Date(req.body.publication_date),
            source_url: req.body.source_url,
        };

        console.log('articleData', articleData)
        const article = await Article.create(articleData);

        await extractAndSaveTopics(article);

        res.redirect('/articles');
    } catch (error) {
        console.error("Error creating article:", error);
        res.status(500).render('error', {
            message: "There was an error creating the article. Please try again later."
        });
    }
};

