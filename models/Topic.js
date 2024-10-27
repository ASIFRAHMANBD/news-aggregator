const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Topic extends Model {
        static associate(models) {
            Topic.belongsTo(models.Article, {
                foreignKey: 'article_id',
                onDelete: 'CASCADE',
            });
        }
    }

    Topic.init({
        article_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Article',
                key: 'id',
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Topic',
        tableName: 'topics',
        timestamps: true, 
    });

    return Topic;
};
