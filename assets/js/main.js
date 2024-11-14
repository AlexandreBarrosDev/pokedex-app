
const pokemonList = document.querySelector('#pokemon-list');
const pokemonModal = document.querySelector('#pokemon-modals');
const pokemonButton = document.querySelector('#pokemon-button');
const loadMoreButton = document.querySelector('#load-more');
let offset = 0;
const limit = 20;
const maxRecords = 151;

function convertPokemonToLi(pokemon) {

    return `
        <li id="pokemon" class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img 
                    src=${pokemon.photo} 
                    alt=${pokemon.name} 
                />
            </div>
            <a href="#${pokemon.name}" class="open-modal">Detalhes &#11205;</a>
        </li>
    `
}

function createPokemonHtml(pokemon) {

    return `
            <div id="${pokemon.name}" class="modal ${pokemon.type}">
                <div class="modal-content">
                    <div class="modal-header">
                        <a href="#close-modal" class="close-modal">&times;</a>
                        <div class="modal-id">
                            <span class="number">#${pokemon.number}</span>
                            <h2>${pokemon.name}</h2>
                        </div>
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img 
                            src=${pokemon.photo} 
                            alt=${pokemon.name} 
                        />
                        <div class="modal-body">
                            <h3>Habilidades: </h3>
                            <ol class="abilities">
                                ${pokemon.abilities.map((ability) => `<li class="ability">&#10022; ${ability}</li><br/>`).join('')}
                            </ol>
                            <ol class="atributes">
                                <h3>Atributos: </h3>
                                <li> XP Base: &diams; ${pokemon.baseXp}</li>
                                <li> Altura: &#9876; ${pokemon.height}</li>
                            </ol>
                        </div>
                    </div>
                        
                </div>
            </div>
    `
}

function createPokemonModal(offset, limit) {
    
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newModal = pokemons.map(createPokemonHtml).join('');
        pokemonModal.innerHTML += newModal;

    })
}

function loadMorePokemons(offset, limit) {
    
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml
    })
}

loadMorePokemons(offset, limit);
createPokemonModal(offset, limit);

loadMoreButton.addEventListener('click', () => {
    
    offset += limit;
    const qtdRecordsWithNextPage = offset + limit;

    if(qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadMorePokemons(offset, newLimit);
    
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadMorePokemons(offset, limit);
    }
})