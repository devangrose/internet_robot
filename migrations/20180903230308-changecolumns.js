'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
      queryInterface.renameColumn('usercommands', 'command', 'content');
      queryInterface.renameColumn('usercommands', 'userid', 'userId');
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
      queryInterface.renameColumn('usercommands', 'content', 'command');
      queryInterface.renameColumn('usercommands', 'userId', 'userid');
  }
};
