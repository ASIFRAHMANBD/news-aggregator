
const { Article } = require('../models');
const extractAndSaveTopics = require('../utils/topicExtractor');

async function saveArticleAndExtractTopics(articleData) {
    try {
        const article = await Article.create(articleData);
        await extractAndSaveTopics(article);
    } catch (error) {
        console.error("Error saving article or extracting topics:", error);
    }
}

module.exports = { saveArticleAndExtractTopics };
