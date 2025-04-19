const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Car = sequelize.define('Car', {
  model: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Modelo é obrigatório" }
    }
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Marca é obrigatória" }
    }
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: "Ano deve ser um número inteiro" },
      isFourDigits(value) {
        if (value < 1000 || value > 9999) {
          throw new Error("Ano deve ter 4 dígitos");
        }
      },
    }
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Cor é obrigatória" }
    }
  },
  plate: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Placa é obrigatória" },
      isValidPlaca(value) {
        const placa = value.toUpperCase(); 
        const formatoAntigo = /^[A-Z]{3}[0-9]{4}$/;
        const formatoMercosul = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;
        if (!formatoAntigo.test(placa) && !formatoMercosul.test(placa)) {
          throw new Error('Placa inválida (ex: ABC1234 ou BRA1E23)');
        }
      }
    },
    set(value) {
      this.setDataValue('placa', value.toUpperCase());
    }
  },
});

module.exports = Car;
