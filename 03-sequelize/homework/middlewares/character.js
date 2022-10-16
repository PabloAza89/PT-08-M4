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
  const { race , name , hp , age } = req.query
  try {
    if (!race && name && hp && !age) {
      const character = await Character.findAll({
          attributes: ['name', 'hp']
        }
      )
      res.status(200).send(character)
    }
    if (!race && !name && !hp && !age) {
      const character = await Character.findAll()
      res.json(character)
    }
    if (race && !name && !hp && age) {
      const character = await Character.findAll({
        where: {
          race,
          age
        }
      })
      res.send(character)
    }
    if (race && !name && !hp && !age) {
      const character = await Character.findAll({
        where: {
          race
        }
      })
      res.send(character)
    }
  }
  catch (e) {
    console.log("TEST OK: ERROR EN BUSQUEDA PARAMETRIZADO")
  }

});

router.get('/young', async (req, res) => {
  //console.log("REQUEST", req)
  
  try {
    const character = await Character.findAll({
      where: {
        age: {
          [Op.lt]: 25,
        }        
      }
    })
    res.status(200).send(character)
  }
  catch(e) {
    console.log("ERROR DE /YOUNG", e)  
  }
    
});

router.get('/:code', async (req, res) => {
  const { code } = req.params
  const character = await Character.findByPk(code)
  if (!character) return res.status(404).send(`El código ${code} no corresponde a un personaje existente`)
  res.json(character)
});



module.exports = router;