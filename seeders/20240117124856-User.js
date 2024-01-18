'use strict';

/** @type {import('sequelize-cli').Migration} */
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {

    const users = [];
    const numberOfUsers = 5; // Sesuaikan dengan jumlah user yang diinginkan
    let pwd = await bcrypt.hash('password', 10);

    for (let i = 0; i < numberOfUsers; i++) {
      users.push({
        email: faker.internet.email(),
        password: pwd,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('Users', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
