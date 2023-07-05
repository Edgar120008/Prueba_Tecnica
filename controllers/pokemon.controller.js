const {request, respons} = require('express');
const axios = require('axios');
const generarPDF  = require("../helpers/pokemonPDF.helper")

const getPokemons = async(req=request, res=respons) =>{

    const limit = req.query.limit; 
    const page = req.query.page;
    const search = req.query.search;

  let url = 'https://pokeapi.co/api/v2/pokemon?';

  if (limit) {

    if(isNaN(limit)){
        return res.status(400).json({message:'Introdusca solo datos numericos para realizar el limite de pokemones que se mostraran'})
    }else if(limit==='0'){
      return res.status(400).json({message:'Introdusca solo datos mayores a 0 para realizar el limite de pokemones que se mostraran'})
    }else{    
        url += `limit=${limit}&`;
    }
}

if (page) {

    if(isNaN(page)){
        return res.status(400).json({message:'Introdusca solo datos numericos para realizar la paginacion correcta de los pokemons'})
    }else if(page==='0'){
      return res.status(400).json({message:'Introdusca solo datos mayores a 0 para realizar la paginacion de pokemones que se mostraran'})
    }else{

        const offset = (page - 1) * limit;
        url += `offset=${offset}&`;
    }
}

if(!limit && !page){
    url += `limit=1010&`;
    url += `offset=1`;
  }

  try {
    const response = await axios.get(url);
    const { results } = response.data;
    let pokemons = [];

    if (search) {
      // Filtrar los Pokémon por nombre que contenga el criterio de búsqueda parcial
      const filteredPokemons = results.filter(pokemon => pokemon.name.includes(search));
      filteredPokemons.sort((a, b) => a.name.localeCompare(b.name));
      pokemons = filteredPokemons;
    } else {
      // Ordenar los pokemons alfabéticamente por nombre
      results.sort((a, b) => a.name.localeCompare(b.name));
      pokemons = results;
    }

    if (page && limit) {
      // Aplicar paginación si se proporcionan los parámetros de paginación
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + parseInt(limit);
      pokemons = pokemons.slice(startIndex, endIndex);
    }

    return res.status(200).json({ pokemons });

  } catch (err) {
    // Manejo de errores
    return res.status(500).json({message:'Error al obtener los pokemons.'});
  }
}

const pokemonInfoPDF = async(req=request, res=respons)=>{

    const pokemonName = req.body.pokemonName;

  try {
    
    let pokemonDoc = await generarPDF(pokemonName);
    res.setHeader('Content-Disposition', `attachment; filename="${pokemonName}.pdf"`);
    pokemonDoc.pipe(res);
    pokemonDoc.end();

    return res.status(201)

  } catch (err) {
    return res.status(404).json({ error: 'Pokémon no encontrado.' });
  }
}

module.exports={
    getPokemons,
    pokemonInfoPDF
}