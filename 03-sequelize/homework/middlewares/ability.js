const { Router } = require('express');
const { Ability } = require('../db');
const router = Router();

router.post('/', async (req, res) => {
    const { name , mana_cost } = req.body;
    //AA { name: 'Fire Ball', mana_cost: 80.5 }
    //console.log("AA", req.body)
    /* if (!code || !name || !hp || !mana ) {
      return res.status(404).send("Falta enviar datos obligatorios")
    } */
    if (!name && !mana_cost) {
      return res.status(404).send("Falta enviar datos obligatorios");
    }
    try {
      if (name && mana_cost) {
        const newAbylity = await Ability.create(req.body);
        return res.status(201).json(newAbylity);
      }
    } catch (e) {
      return res.status(404).send("Falta enviar datos obligatorios");
    }
});

router.put('/setCharacter', async (req, res) => {
  const { idAbility , codeCharacter } = req.body
  //console.log("AA", codeCharacter, "BB" , idAbility);

  try {
    let ability = await Ability.findByPk(idAbility)
    await ability.setCharacter(codeCharacter)
    let result = await Ability.findByPk(idAbility, {
      attributes: ['name', 'description', 'mana_cost', 'CharacterCode']
    });
    res.status(201).json(result)
  } catch (e) {
    console.log(e)    
  } 
});  

module.exports = router;