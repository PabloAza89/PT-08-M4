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



modelCharacter(db);
modelAbility(db);
modelRole(db);

// added

const { Character , Ability , Role } = db.models;

Character.hasMany(Ability);
Ability.belongsTo(Character);
Character.belongsToMany(Role, { through: 'Character_Role' });
Role.belongsToMany(Character, { through: 'Character_Role' });

// added

module.exports = {
  ...db.models,
  db,
  Op
}