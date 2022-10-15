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

module.exports = {
  ...db.models,
  db,
  Op
}