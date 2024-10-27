const cron = require('node-cron');
const { fetchArticles } = require('./services/rssService');

cron.schedule('0 * * * *', () => {
    console.log('Fetching articles from RSS feeds...');
    fetchArticles();
});
