const { DataTypes } = require('sequelize');

const attributes = {
  id: { primaryKey: true, type: DataTypes.INTEGER,
  },
  name: { type: DataTypes.STRING, }
};

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const Category = sequelize.define('Category', attributes, { tableName: 'Categories' , timestamps: false});
  return Category;
};
