const { DataTypes } = require('sequelize');

const attributes = {
  postId: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'BlogPosts',
      key: 'id'
    },
  },
  categoryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Categories',
      key: 'id',
    },
  },
};

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const PostCategory = sequelize.define('PostCategory', attributes, { tableName: 'PostCategories' , timestamps: false});

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory, foreignKey: 'categoryIds',
      otherKey: 'postId', as: 'posts',
    });
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory, foreignKey: 'postId',
      otherKey: 'categoryId', as: 'categories',
    });
  }

  return PostCategory;
};
