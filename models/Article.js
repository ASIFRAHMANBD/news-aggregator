
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Article extends Model {
        static associate(models) {
            Article.hasMany(models.Topic, {
                foreignKey: 'article_id',
                onDelete: 'CASCADE',
            });
        }
    }

    Article.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        publication_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        source_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Article',
        tableName: 'articles',
        timestamps: true,
    });

    return Article;
};
