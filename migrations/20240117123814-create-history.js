'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        references: {
          model:{
            tableName : 'Users'
          },
          key: 'id'
        }
      },
      ip_address: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.STRING
      },
      longitude: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      updatedAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Histories');

    const options =  { raw: true};

    try {

      //disable foreign key check
      await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, options);

      //drop table
      await queryInterface.dropTable('Histories');

      //enable foreign key check after dropping table
      await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, options);

      // If the execution reaches this line, no errors were thrown.
      // We commit the transaction.
      // await t.commit();

    } catch (error) {

      // If the execution reaches this line, an error was thrown.
      // We rollback the transaction.
      // await t.rollback();

    }
  }
};