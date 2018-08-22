'use strict';
module.exports = (sequelize, DataTypes) => {
  var book = sequelize.define('book', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    pages: DataTypes.INTEGER
  }, {});
  book.associate = function(models) {
    // associations can be defined here
  };
  return book;
};