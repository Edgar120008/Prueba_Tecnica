const { Router } = require('express');
const { getPokemons,
        pokemonInfoPDF } = require('../controllers/pokemon.controller');

const router = Router();

router.get('/getPokemons', getPokemons);

router.post('/pokemonInfoPDF', pokemonInfoPDF);

module.exports=router