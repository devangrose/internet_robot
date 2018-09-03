'use strict';
module.exports = (sequelize, DataTypes) => {
  var usercommand = sequelize.define('usercommand', {
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  usercommand.associate = function(models) {
    // associations can be defined here
    models.usercommand.belongsTo(models.user);
  };
  return usercommand;
};
