const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();

//router.use(express.json());

router.post('/character', async (req, res) => {
    const { code, name, age, race, hp, mana, date_added } = req.body;
    try {
      const newCharacter = await Character.create({
        code,
        name,
        age,
        race,
        hp,
        mana,
        date_added
      });
      res.json(newCharacter);
    } catch (error) {
      res.send(error);
    }
  });

module.exports = router;