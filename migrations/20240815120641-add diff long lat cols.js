'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      queryInterface.sequelize.query(`
        alter table "Tasks"  
        add column "long" decimal,
        add column "lat" decimal;
      `);
    } catch (err) {
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      queryInterface.sequelize.query(`
        alter table "Tasks"  
        drop column "long",
        drop column "lat";
      `);
    } catch (err) {
      throw err;
    }
  }
};
