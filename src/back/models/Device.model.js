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
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 64],
          msg: 'La longitud de \'name\' debe ser entre 5 y 50 caracteres.'
        }
      }
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 128],
          msg: 'La longitud de \'descripcion\' debe ser entre 1 y 128 caracteres.'
        }
      }
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
    dimerized: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: {
          args: true,
          msg: 'Campo \'dimerized\' solo admite números.'
        },
        len: {
          args: [1, 1],
          msg: 'La longitud de \'dimerized\ debe ser de 1 caracteres.'
        },
        notNull: {
          msg: 'El campo \'dimerized\ no puede ser nulo.'
        }
      }
    },
    dimer_value: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        isInt: {
          args: true,
          msg: 'Campo \'dimer_value\' solo admite números.'
        },
        notNull: {
          msg: 'El campo \'dimer_value\ no puede ser nulo.'
        }
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()'),
      allowNull: true
    }
  }, {
      sequelize,
      modelName: 'devices',
      timestamps: true,
      underscored: true,
  });

  return Device;
};