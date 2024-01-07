const pokeApi = {}

function convertPokeApiDetailToPokemonClass(pokemonsDetail) {
    const pokemon = new Pokemon()
    pokemon.name = pokemonsDetail.name
    pokemon.number = pokemonsDetail.id 
    pokemon.types = pokemonsDetail.types.map((typeSlot) => typeSlot.type.name)
    pokemon.main_type = pokemon.types[0]
    pokemon.photo = pokemonsDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    /*
     * retorna lista de Promises com a urls de cada pokemon
     * Ex: 
     * https://pokeapi.co/api/v2/pokemon/1
     * https://pokeapi.co/api/v2/pokemon/2
     * https://pokeapi.co/api/v2/pokemon/3
     * 
     * Lembrando que retorna uma Promise para cada url.
     */
    // 
    
    return fetch(pokemon.url)
        .then((response) => response.json())
        // .then((pokemon) => convertPokeApiDetailToPokemonClass(pokemon))
        .then(convertPokeApiDetailToPokemonClass)
}

pokeApi.getPokemons = (offset = 440, limit = 20) => {
    /*
     * Retorna uma lista com detalhes de Pokemons
     */
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((data) => data.results)
        .then((pokemons) => pokemons.map((pokemon) => pokeApi.getPokemonDetail(pokemon)))
        .then((detailRequests) => Promise.all(detailRequests))
        // .then((pokemonsDetails) => pokemonsDetails)

        .catch((error) => console.log(error))
}
