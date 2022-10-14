const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();

//router.use(express.json());

router.post('/', async (req, res) => {
  console.log("AA", req.body)
    const { code, name, age, race, hp, mana, date_added } = req.body;
    if (!code || !name || !age || !race || !hp || !mana || !date_added) {
      return res.status(404).send("Falta enviar datos obligatorios")
    }
    try {
      const newCharacter = await Character.create(req.body);
      return res.status(201).json(newCharacter);
    } catch (e) {
      return res.status(404).send("Error en alguno de los datos provistos");
    }
  });

module.exports = router;