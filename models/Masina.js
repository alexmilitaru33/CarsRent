const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Specificatii = require('./Specificatii');

const Masina = sequelize.define('Masina', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pret: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  win: {
    unique: true,
    type: DataTypes.STRING,
    allowNull: false
  },
  id_specificatii: {
    type: DataTypes.INTEGER,
    references: {
      model: Specificatii,
      key: 'id'
    }
  }
}, {
  tableName: 'masina',
  timestamps: false
});

Masina.belongsTo(Specificatii, { foreignKey: 'id_specificatii' });

module.exports = Masina;
