const { Router } = require('express');
const express = require('express');
const { where } = require('sequelize');
const { Op, Character, Role } = require('../db');
const router = Router();

router.post('/', async (req, res) => {
  //console.log("AA", req.body)
    const { code, name, hp, mana} = req.body;
    if (!code || !name || !hp || !mana ) {
      return res.status(404).send("Falta enviar datos obligatorios")
    }
    try {
      const newCharacter = await Character.create(req.body);
      return res.status(201).json(newCharacter);
    } catch (e) {
      return res.status(404).send("Error en alguno de los datos provistos");
    }
});

router.get('/', async (req, res) => {
  const { race } = req.body
  try {
    if (!race) {
      const character = await Character.findAll()
      res.json(character)
    }
    else {
      const character = await Character.findAll({
        where: {
          race
        }
      })
      res.send(character)
    }    
  }
  catch (e) {
    console.log(e)
  }

});


router.get('/:code', async (req, res) => {
  const { code } = req.params
  const character = await Character.findByPk(code)
  if (!character) return res.status(404).send(`El código ${code} no corresponde a un personaje existente`)
  res.json(character)
});

module.exports = router;