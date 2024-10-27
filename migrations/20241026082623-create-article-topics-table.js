'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('article_topics', {
      article_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'articles', // This should match your articles table name
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      topic_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'topics', // This should match your topics table name
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('article_topics');
  },
};
