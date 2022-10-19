const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Character', {
    code: {      
      type: DataTypes.STRING(5),
      primaryKey: true,
      validate: {
        not: /[Hh][Ee][Nn][Rr][Yy]/,
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notIn: [['Henry', 'SoyHenry', 'Soy Henry']]
      }
    },
    age: {
      type: DataTypes.INTEGER,
      get() {
        // return this.skill + ' points'; // Wrong!
        /* return this.getDataValue('age') + ' years old'; */
        let res = this.getDataValue('age')
        return res ? res + ' years old' : null;
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