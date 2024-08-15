'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.sequelize.query('begin;');
      await queryInterface.sequelize.query('alter table "Tasks" drop column "firstName";');
      await queryInterface.sequelize.query('alter table "Tasks" drop column "lastName";');
      await queryInterface.sequelize.query('alter table "Tasks" add column "content" varchar(100);');
      await queryInterface.sequelize.query('commit;');
    } catch (err) {
      await queryInterface.sequelize.query('rollback;');
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
  }
};
