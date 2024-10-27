



const nlp = require('compromise');
const { Topic } = require('../models');

async function extractAndSaveTopics(article) {
    console.log("Processing article:", article);

    const doc = nlp(article.description || article.title);

    const nouns = doc.nouns().out('array');
    const mainTopics = doc.topics().out('array');
    const places = doc.places().out('array');
    const organizations = doc.organizations().out('array');

    console.log("Extracted nouns:", nouns);
    console.log("Extracted main topics:", mainTopics);
    console.log("Extracted places:", places);
    console.log("Extracted organizations:", organizations);

    const topics = [...nouns, ...mainTopics, ...places, ...organizations];

    const uniqueTopics = [...new Set(topics)].slice(0, 5); 

    console.log("Unique topics for saving:", uniqueTopics);

    for (const topicName of uniqueTopics) {
        if (topicName) {
            await Topic.create({
                article_id: article.id,
                name: topicName,
            });
        }
    }
}

module.exports = extractAndSaveTopics;




