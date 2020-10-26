'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Devices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'Nombre de Device en uso.'
        },
        validate: {
          isAlpha: {
            args: true,
            msg: 'Este campo solo adminte letras.'
          },
          len: {
            args: [5, 64],
            msg: 'La longitud de este campo debe ser entre 5 y 50 caracteres.'
          },
          notNull: {
            msg: 'El campo no puede ser nulo.'
          }
        }
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            args: true,
            msg: 'Este campo solo adminte letras.'
          },
          len: {
            args: [1, 128],
            msg: 'La longitud de este campo debe ser entre 1 y 128 caracteres.'
          }
        }
      },
      state: {
        type: DataTypes.INT,
        allowNull: false,
        validate: {
          isAlpha: {
            args: true,
            msg: 'Este campo solo adminte letras.'
          },
          len: {
            args: [5, 64],
            msg: 'La longitud de este campo debe ser entre 5 y 50 caracteres.'
          },
          notNull: {
            msg: 'El campo state no puede ser nulo.'
          }
        }
      },
      type: {
        type: DataTypes.INT,
        allowNull: false,
        validate: {
          isNumber: {
            args: true,
            msg: 'Este campo solo adminte números.'
          },
          len: {
            args: [1, 3],
            msg: 'La longitud de este campo debe ser entre 1 y 3 caracteres.'
          },
          notNull: {
            msg: 'El campo Type no puede ser nulo.'
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Devices');
  }
};