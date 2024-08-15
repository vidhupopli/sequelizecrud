'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.sequelize.query(`
        alter table "Tasks"
        add column "location" point;
      `);
    } catch (error) {
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.query('alter table "Tasks" drop column location');
  }
};
