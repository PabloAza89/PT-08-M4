const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Ability', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'composite_unique'
    },
    description: {
      type: DataTypes.TEXT
    },
    mana_cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
      unique: 'composite_unique'
    },
    CharacterCode: {
      type: DataTypes.VIRTUAL,
      get() {
        return {name: `${this.name}`, mana_cost: `${this.mana_cost}`};
      },
      set() {
        throw new Error('Do not try to set the `fullName` value!');
      }
    }
  }, {
    timestamps: false
  }
)};
