const { Router } = require('express');
const { Ability } = require('../db');
const router = Router();

router.post('/', async (req, res) => {
      //const { code, name, hp, mana} = req.body;
      console.log("AA", req.body)
     /*  if (!code || !name || !hp || !mana ) {
        return res.status(404).send("Falta enviar datos obligatorios")
      }
      try {
        const newCharacter = await Character.create(req.body);
        return res.status(201).json(newCharacter);
      } catch (e) {
        return res.status(404).send("Error en alguno de los datos provistos");
      } */
  });

module.exports = router;