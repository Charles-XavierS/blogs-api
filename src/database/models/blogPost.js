const { DataTypes } = require('sequelize');

const attributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.INTEGER,
    foreignKey: true,
  },
  published: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updated: {
    type: DataTypes.DATE,
    allowNull: false,
  },
};

  /** @param {import('sequelize').Sequelize} sequelize */
  module.exports = (sequelize) => {
    const BlogPost = sequelize.define('BlogPost', attributes, { tableName: 'BlogPosts' , timestamps: false});
    
    BlogPost.associate = (models) => {
      BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
    
    return BlogPost;
  };
