'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  Device.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Nombre de Device en uso.'
      },
      validate: {
        isAlphanumeric: {
          args: true,
          msg: 'Campo \'name\' solo adminte letras.\n'
        },
        len: {
          args: [1, 64],
          msg: 'La longitud de \'name\' debe ser entre 5 y 50 caracteres.'
        },
        notNull: {
          msg: 'El campo \'name\' no puede ser nulo.'
        }
      }
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          args: true,
          msg: 'Campo \'descripcion\' solo adminte letras.'
        },
        len: {
          args: [1, 128],
          msg: 'La longitud de \'descripcion\' debe ser entre 1 y 128 caracteres.'
        }
      }
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          args: true,
          msg: 'Campo \'state\' solo admite números.'
        },
        len: {
          args: [1, 3],
          msg: 'La longitud de \'state\' debe ser entre 1 y 3 caracteres.'
        },
        notNull: {
          msg: 'El campo \'state\' no puede ser nulo.'
        }
      }
    },
    type: {
        type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
        isInt: {
            args: true,
            msg: 'Campo \'type\' solo admite números.'
          },
        len: {
            args: [1, 3],
                msg: 'La longitud de \'type\ debe ser entre 1 y 3 caracteres.'
          },
          notNull: {
            msg: 'El campo \'type\ no puede ser nulo.'
          }
        }
    },
    createdAt: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    },
    updatedAt: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      allowNull: false
    }
  }, {
      sequelize,
      modelName: 'Devices',
  });

  return Device;
};