'use strict';
module.exports = (sequelize, DataTypes) => {
  var commands = sequelize.define('commands', {
    content: DataTypes.TEXT
  }, {});
  commands.associate = function(models) {
    // associations can be defined here
  };
  return commands;
};