const Parser = require('rss-parser');
const parser = new Parser();
const { sequelize } = require('../config/db');
const rssFeeds = require('../config/rssFeeds');
const extractAndSaveTopics = require('../utils/topicExtractor'); 

const fetchArticles = async () => {
    try {
        const { default: PQueue } = await import('p-queue');
        const queue = new PQueue({ concurrency: 2 }); 

        for (const feed of rssFeeds) {
            queue.add(async () => {
                try {
                    console.log(`Fetching feed: ${feed}`);
                    const rssFeed = await fetchWithRetry(feed);
                    console.log(`Fetched ${rssFeed.items.length} items from ${feed}`);

                    for (const item of rssFeed.items) {
                        const results = await sequelize.query(
                            'SELECT * FROM articles WHERE title = :title',
                            {
                                replacements: { title: item.title },
                                type: sequelize.QueryTypes.SELECT,
                            }
                        );

                        if (results.length === 0) {
                            const newArticle = await sequelize.query(
                                'INSERT INTO articles (title, description, publication_date, source_url, "createdAt", "updatedAt") VALUES (:title, :description, :publication_date, :source_url, NOW(), NOW()) RETURNING *',
                                {
                                    replacements: {
                                        title: item.title,
                                        description: item.contentSnippet,
                                        publication_date: new Date(item.pubDate),
                                        source_url: item.link,
                                    },
                                    type: sequelize.QueryTypes.INSERT,
                                }
                            );

                            const insertedArticle = newArticle[0][0]; 
                            setImmediate(async () => {
                                await extractAndSaveTopics(insertedArticle); 
                            });
                        }
                    }
                } catch (feedError) {
                    console.error(`Error processing feed ${feed}:`, feedError.message);
                }
            });
        }

        await queue.onIdle();
        console.log('Finished fetching and saving articles.');
    } catch (overallError) {
        console.error('Error in the overall fetching process:', overallError);
    }
};

const fetchWithRetry = async (url, retries = 3) => {
    for (let i = 0; i < retries; i++) {
        try {
            return await parser.parseURL(url);
        } catch (error) {
            if (i === retries - 1) {
                console.error(`Failed to fetch ${url} after ${retries} attempts:`, error.message);
                throw error;
            }
            console.log(`Retrying ${url} (${i + 1}/${retries})...`);
        }
    }
};

module.exports = { fetchArticles };
