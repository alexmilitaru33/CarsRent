const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Masina = require('./Masina');
const User = require('./Users');

const Inchiriere = sequelize.define('Inchiriere', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_client: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {  
      model: 'client', 
      key: 'id'       
    }
  },
  id_masina: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'masina', 
      key: 'id'
    }
  },
  data_inchiriere: {
    type: DataTypes.DATE,
    allowNull: false
  },
  data_predare: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'inchiriere', 
  timestamps: false
});


User.hasMany(Inchiriere, { foreignKey: 'id_client' });
Inchiriere.belongsTo(User, { foreignKey: 'id_client' });

Masina.hasMany(Inchiriere, { foreignKey: 'id_masina' });
Inchiriere.belongsTo(Masina, { foreignKey: 'id_masina' });

module.exports = Inchiriere; 
