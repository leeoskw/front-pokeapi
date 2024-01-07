const pokemonListHtml = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const limit = 5
let offset = 0
const maxRecords = 11


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


// pokeApi.getPokemons().then((pokemons = []) => {
//     // Código abaixo tem o mesmo efeito 
    
//     // const newPokemonListLiItems = pokemons.map( (pokemon, index, array) =>  convertPokemonToHtmlLi(pokemon))
//     // const pokemonLiItemsFiltered = newPokemonListLiItems.join('')
//     // pokemonListHtml.innerHTML += pokemonLiItemsFiltered

    
//     // pokemonListHtml.innerHTML += pokemons.map((value) => convertPokemonToHtmlLi(value)).join('')
//     pokemonListHtml.innerHTML += pokemons.map(convertPokemonToHtmlLi).join('')
// })

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToHtmlLi).join('')
        pokemonListHtml.innerHTML += newHtml
    })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const countRecordsNextPage = offset + limit
    
    if (countRecordsNextPage >= maxRecords){
        const newLimit = maxRecords - offset // 11 - 9 => 2
        loadPokemonItems(offset, newLimit)
        // remove botão

        loadMoreButton.parentElement.removeChild(loadMoreButton)
        return 
    }
    loadPokemonItems(offset, limit)
})

