const { Sequelize , Op , DataTypes } = require('sequelize');
const modelCharacter = require('./models/Character.js');
const modelAbility = require('./models/Ability.js');
const modelRole = require('./models/Role.js');

const db = new Sequelize('postgres://postgres:aza1410@localhost:5432/henry_sequelize', {
  logging: false,
});

/* db.authenticate()
.then(() => {console.log("DB conectada")})
.catch ((e) => {console.log("Tenes este error -->", e)}) */



const Character = db.define('Character', {
    code: {
    allowNull: false,
    type: DataTypes.STRING(5),
    primaryKey: true  
    },
    name: {
    type: DataTypes.STRING,
    unique: true,
    },
    age: {
      type: DataTypes.INTEGER
    },
    race: {
      type: DataTypes.ENUM('Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other'),
      defaultValue: "Other"
    },
    hp: {
      type: DataTypes.FLOAT
    },
    mana: {
      type: DataTypes.FLOAT
    },
    date_added: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.DATEONLY
    }
  }, {
    timestamps: false
  }
);

 /*  sequelize.define('Role', {
    sequelize.define('Ability', { */


modelCharacter(db);
modelAbility(db);
modelRole(db);

module.exports = {
  ...db.models,
  db,
  Op
}