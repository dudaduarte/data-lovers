window.onload = function () {
    showPokemons();
    getPokemonOnClick();
}


function getPokemonOnClick() {
    let pokemonList = document.querySelectorAll('.pokemon-img');

    for (let pokemon of pokemonList) {
        pokemon.addEventListener('click', function (event) {
            setPokemon(event.target.src);
        })
    }
}

let buttonsFilter = document.querySelectorAll('.type-pokemon');

for (let button of buttonsFilter) {
    button.addEventListener('click', function (event) {
        let type = event.target.value;
        if (type === "All") {
            showPokemons()
        } else {
            filterByType(type);
        }
        getPokemonOnClick();
    })
}

document.querySelector('#input-name-pokemon').addEventListener('input', function (event) {
    searchName(event.target.value);
});

function getPokemons() {
    return POKEMON["pokemon"];
}

function filterByType(typep) {
    const filter = getPokemons().filter((pokemon) => (pokemon["type"].includes(typep)));
    showPokemons(filter);
}

function showPokemons(filter = getPokemons()) {
    let pokemonDiv = document.querySelector('#pokemon-div');

    pokemonDiv.innerHTML = `  
    ${filter.map((poke) => `
    <div class="single-pokemon">
      <img src="${poke["img"]}"
      class="pokemon-img" />
        <h4 class="select-num-pokemon">${poke["num"]}</h4>
        <h3 class="pokemon-name">${poke["name"]}</h3>
        <p class="select-type-pokemon">${poke["type"].join(', ')}</p>
      </div>
      `).join("")}
      `
      getPokemonOnClick();
}

function searchName(input) {
    const filterName = getPokemons().filter((pokemon) => (pokemon["name"].toLowerCase().includes(input.toLowerCase())));
    showPokemons(filterName);
}

function setPokemon(img) {
    const divImg = document.querySelector('.img-picked-pokemon');
    const divInfo = document.querySelector('.info-picked-pokemon');
    const divEvolutions = document.querySelector('.evolutions-pokemons');

    const getInformationsByImg = (getPokemons().filter((pokemon) => (pokemon["img"] === img)))[0];

    divInfo.innerHTML = `
    <section class="description-pokemon-card">
        <section class="info-container">
            <h5 class="title-info-name">${getInformationsByImg["name"]}</h5>
            <div>
                <h5 class="title-info">Type:</h5><span class="info">${getInformationsByImg["type"].join("/")}</span>
            </div><div>
                <h5 class="title-info">Weaknesses:</h5><span class="info">${getInformationsByImg["weaknesses"].join(", ")}</span>
            </div><div>
                <h5 class="title-info">Spawn Time:</h5><span class="info">${getInformationsByImg["spawn_time"]}</span>
            </div>
        </section>
        <section class="info-container">
            <div>
                <h5 class="title-info">Weight:</h5><span class="info">${getInformationsByImg["weight"]}</span>
            </div><div>
                <h5 class="title-info">Height:</h5><span class="info">${getInformationsByImg["height"]}</span>
            </div>
        </section>
    </section>
        `

    let nextEvolutionsNames = [];
    const nextEvolutions = getInformationsByImg["next_evolution"];

    if (nextEvolutions) {
        for (let nextPokemon of nextEvolutions) {
            nextEvolutionsNames.push(nextPokemon["name"]);

            divEvolutions.innerHTML = `
        <div class="evolution-card">
        <h5 class="title-info">Next Evolutions:</h5>
        <span class="info">${nextEvolutionsNames.join(', ')}
        </div>
        `
        }
     } else {
            divEvolutions.innerHTML = "";
        }

    divImg.innerHTML = `
    <img src="${img}" class="poke-teste">    
    `
}