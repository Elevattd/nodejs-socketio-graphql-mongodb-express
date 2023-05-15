const axios = require("axios");
const { Product } = require("../models");
const API_POKEMON = "https://pokeapi.co/api/v2/pokemon?limit=6";

const getProducts = async () => {
  try {
    const pokemonRequest = await axios.get(API_POKEMON);
    const pokemonUrlRequest = await pokemonRequest.data.results.map((result) =>
      axios.get(result.url)
    );
    const pokemonUrlInfo = await axios.all(pokemonUrlRequest);
    let pokemons = pokemonUrlInfo.map((pokemon) => pokemon.data);
    pokemons.map(async (pokemon) => {
      let product = await Product.findOne({
        name: pokemon.name,
      });

      if (!product) {
        const newProduct = new Product({
          name: pokemon.name,
          image: pokemon.sprites.other.dream_world.front_default,
          description:
            pokemon.types.length < 2
              ? `El NFT coleccionable de ${pokemon.name.replace(
                  pokemon.name.charAt(0),
                  pokemon.name.charAt(0).toUpperCase()
                )} es uno de la primer tanda original, de 150 de la saga Pokémon. Es de tipo ${
                  pokemon.types[0].type.name
                }.`
              : `El NFT coleccionable de ${pokemon.name.replace(
                  pokemon.name.charAt(0),
                  pokemon.name.charAt(0).toUpperCase()
                )} es uno de la primer tanda original, de 150 de la saga Pokémon. Es de tipo ${
                  pokemon.types[0].type.name
                } y ${pokemon.types[1].type.name}.`,
          price: Math.floor(Math.random() * 10000),
        });
        await newProduct.save();
      }
    });

    return;
  } catch (error) {
    console.log("error: ", error);
  }
};

module.exports = {
  getProducts,
};
