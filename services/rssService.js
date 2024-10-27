const Parser = require('rss-parser');
const { Article } = require('../models/Article'); 
const rssFeeds = require('../config/rssFeeds');

const parser = new Parser();

const fetchArticles = async () => {
    try {
        for (const feed of rssFeeds) {
            console.log(`Fetching feed: ${feed}`);
            const rssFeed = await parser.parseURL(feed);
            console.log(`Fetched ${rssFeed.items.length} items from ${feed}`);

            for (const item of rssFeed.items) {
                console.log(`Processing article: ${item.title}`);

                const [article, created] = await Article.findOrCreate({
                    where: { title: item.title },
                    defaults: {
                        description: item.contentSnippet || item.content,
                        publication_date: new Date(item.pubDate),
                        source_url: item.link,
                    },
                });

                if (created) {
                    console.log(`Saved article: ${item.title}`);
                } else {
                    console.log(`Article already exists: ${item.title}`);
                }
            }
        }
        console.log('Finished fetching and saving articles.');
    } catch (error) {
        console.error('Error fetching articles:', error);
    }
};

module.exports = { fetchArticles };
