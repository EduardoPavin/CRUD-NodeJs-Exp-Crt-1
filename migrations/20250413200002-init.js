'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      modelo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      marca: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ano: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      placa: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Cars');
  }
};
