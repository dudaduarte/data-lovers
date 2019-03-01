window.onload = function () {
  showPokemons(getPokemons());
}

let arrayResult = [];

let buttonsFilter = document.querySelectorAll('.type-pokemon');

for (let button of buttonsFilter) {
  button.addEventListener('click', function (event) {
    let type = event.target.value;
    if (type === "All") {
      showPokemons(getPokemons());
    } else {
      filterByType(type);
    }
    getPokemonOnClick();
  })
}

document.querySelector('#input-name-pokemon').addEventListener('input', function (event) {
  filterByName(event.target.value);
});

document.querySelector('.order').addEventListener('change', function (event) {
  if (event.target.value === 'a-to-z') {
    sortByName();
  } else if (event.target.value === 'z-to-a') {
    showPokemons(arrayResult.reverse())
  } else {
    sortByNumber(event.target.value)
  }
})

function getPokemons() {
  arrayResult = POKEMON["pokemon"];
  return arrayResult;
}

function filterByType(type) {
  arrayResult = getPokemons().filter((pokemon) => (pokemon["type"].includes(type)));
  showPokemons(arrayResult);
}

function filterByName(input) {
  const filteredByName = getPokemons().filter((pokemon) => (pokemon["name"].toLowerCase().includes(input.toLowerCase())));
  showPokemons(filteredByName);
}

function sortByName() {
  arrayResult = (arrayResult.sort((a, b) =>
    a.name.localeCompare(b.name))
  );
  showPokemons(arrayResult);
}

function sortByNumber(order) {
  arrayResult = arrayResult.sort(function (a, b) {
    return a.id - b.id;
  })
  if (order === 'decrescent') {
    arrayResult = arrayResult.reverse()
  }
  showPokemons(arrayResult);
}

function getPokemonOnClick() {
  let pokemonList = document.querySelectorAll('.pokemon-img');

  for (let pokemon of pokemonList) {
    pokemon.addEventListener('click', function (event) {
      setPokemon(event.target.src);
    })
  }
}

function showPokemons(pokemonList) {
  let pokemonDiv = document.querySelector('#pokemon-div');
  pokemonDiv.innerHTML = `  
  ${pokemonList.map((poke) => `
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

function setPokemon(img) {
  const divImg = document.querySelector('.img-picked-pokemon');
  const divInfo = document.querySelector('.info-picked-pokemon');
  const divEvolutions = document.querySelector('.evolution-card');
  const getInformationsByImg = (getPokemons().filter((pokemon) => (pokemon["img"] === img)))[0];

  document.querySelector('.evolutions-pokemons').classList.remove('hidden');

  showInfoPokemons(divInfo, getInformationsByImg);
  showNextEvolutions(divEvolutions, getInformationsByImg);
  showBiggerImg(img, divImg);

}

function showInfoPokemons(divInfo, getInformationsByImg) {

  divInfo.innerHTML = `
    <section class="description-pokemon-card">
      <section class="info-container">
        <h5 class="title-info-name">${getInformationsByImg["name"]}</h5>
        <div><h5 class="title-info">Type:</h5><span class="info">${getInformationsByImg["type"].join("/")}</span></div>
        <div><h5 class="title-info">Weaknesses:</h5><span class="info">${getInformationsByImg["weaknesses"].join(", ")}</span></div>
        <div><h5 class="title-info">Spawn Time:</h5><span class="info">${getInformationsByImg["spawn_time"]}</span></div>
    </section>
    <section class="info-container">
      <div><h5 class="title-info">Weight:</h5><span class="info">${getInformationsByImg["weight"]}</span></div>
      <div><h5 class="title-info">Height:</h5><span class="info">${getInformationsByImg["height"]}</span></div>
    </section>
    </section>
        `
}

function showNextEvolutions(divEvolutions, getInformationsByImg) {

  let nextEvolutionsNames = [];
  let getInfoByName = [];
  const nextEvolutions = getInformationsByImg["next_evolution"];

  if (nextEvolutions) {
    for (let i in nextEvolutions) {
      nextEvolutionsNames.push(nextEvolutions[i]["name"]);
      getInfoByName.push((getPokemons().filter((pokemon) => (pokemon["name"].includes(nextEvolutionsNames[i])))))[i];
    }

    divEvolutions.innerHTML = `  
    ${getInfoByName.map((poke) => `
      <div>
      <img src="${poke[0]["img"]}" class="img-evolutions" />
        <h3 class="name-evolution">${poke[0]["name"]}</h3>
      </div>
      <div>
      <i class="fas fa-arrow-circle-right"></i>
      </div>
      `).join(" ")}
      `

  } else {
    divEvolutions.innerHTML = "";
    document.querySelector('.evolutions-pokemons').classList.add('hidden');
  }

}

function showBiggerImg(img, divImg) {

  divImg.innerHTML = `
    <img src="${img}" class="poke-teste">    
    `
}
