function convertPokemonToHtmlLi(pokemon){
    // debugger
    return `
        <li class="pokemon ${pokemon.main_type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `
}

const pokemonListHtml = document.getElementById('pokemonList')

pokeApi.getPokemons().then((pokemons = []) => {
    // Código abaixo tem o mesmo efeito 
    
    // const newPokemonListLiItems = pokemons.map( (pokemon, index, array) =>  convertPokemonToHtmlLi(pokemon))
    // const pokemonLiItemsFiltered = newPokemonListLiItems.join('')
    // pokemonListHtml.innerHTML += pokemonLiItemsFiltered

    
    // pokemonListHtml.innerHTML += pokemons.map((value) => convertPokemonToHtmlLi(value)).join('')
    pokemonListHtml.innerHTML += pokemons.map(convertPokemonToHtmlLi).join('')
})