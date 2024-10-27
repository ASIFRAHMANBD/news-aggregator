const keywordExtractor = require('keyword-extractor');
const { Topic, Article } = require('../models');

exports.extractTopics = async () => {
  try {
    const articles = await Article.findAll();
    for (const article of articles) {
      const keywords = keywordExtractor.extract(article.description, {
        language: 'english',
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: true,
      });

      for (const keyword of keywords) {
        await Topic.create({
          article_id: article.id,
          name: keyword,
        });
      }
    }
    console.log('Topics extracted and stored.');
  } catch (err) {
    console.error('Error extracting topics:', err);
  }
};
