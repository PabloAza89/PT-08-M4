const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Character', {
    code: {      
      type: DataTypes.STRING(5),
      primaryKey: true  
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    age: {
      type: DataTypes.INTEGER,
      get() {
        // return this.skill + ' points'; // Wrong!
        return this.getDataValue('age') + ' years old';
      }
    },
    race: {
      type: DataTypes.ENUM('Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other'),
      defaultValue: "Other"
    },
    hp: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    mana: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    date_added: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false
  }
)};