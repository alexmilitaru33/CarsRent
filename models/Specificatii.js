const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Specificatii = sequelize.define('Specificatii', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  culoare: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nr_kilometrii: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  anvelope: {
    type: DataTypes.ENUM('vara', 'iarna'),
    allowNull: false
  },
  transmisie: {
    type: DataTypes.ENUM('automata', 'manuala'),
    allowNull: false
  },
  motor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  an: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'specificatii',
  timestamps: false
});

module.exports = Specificatii;
