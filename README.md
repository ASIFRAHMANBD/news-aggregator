

#News Aggregator
This is a news aggregator project.

Overview
A well-documented, functional program that aggregates news articles from RSS feeds, stores the data in a PostgreSQL database, and extracts relevant topics from each article. This tool allows efficient searching, filtering, and topic-based navigation for an organized news feed experience.

Features
Fetch News Articles from RSS Feeds: Uses RSS parsing to retrieve news articles, checks for uniqueness, and stores them in the database.
Persist Data in PostgreSQL: Articles and extracted topics are saved in a structured database schema with related tables.
Extract Topics: Implements NLP with Compromise to extract relevant keywords, organizations, places, and key terms from each article's content.
Installation
Clone the Repository:

git clone <repository-url>
cd news-aggregator
Install Dependencies:

npm install
Environment Setup:
Create a .env file with necessary environment variables:

Database connection string (PostgreSQL)
Any additional environment configurations
Run Migrations: Set up the database schema with Sequelize:

npx sequelize-cli db:migrate
Start the Application:

npm start




Project Structure and Logic

Data Structures
Articles Table: Stores article metadata like title, description, publication date, and source URL.
Topics Table: Holds extracted topics, each linked to its respective article via article_id.
RSS Feed Fetching and Article Deduplication
Fetching: RSS feeds are parsed to extract new articles.
Deduplication: Each article’s URL is checked against existing entries to avoid duplication in the database.
Topic Extraction with NLP
Compromise NLP: The library identifies nouns, topics, organizations, and places within the article content.
Filtering Topics: The extracted terms are de-duplicated and saved, limiting the number of topics stored per article.

Searching and Filtering
Keyword Search: Filters articles containing a keyword in the title.
Date Filter: Matches articles published on a specified date.
Topic Filter: Allows users to filter articles by specific topics from the topics table.
Technologies Used

Node.js and Express.js for the server and RESTful API.
Sequelize ORM for database migrations and querying.
PostgreSQL for data storage.
Compromise NLP for extracting topics from article content.
Further Development
Future improvements could include more advanced topic analysis, caching of frequent searches, and real-time RSS feed updates for up-to-date news content.