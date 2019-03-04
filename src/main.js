window.onload = function () {
  showPokemons(getPokemons());
  
  //mostrar o bulbasaur pokemon ao carregar a pagina
  setPokemon("http://www.serebii.net/pokemongo/pokemon/001.png");
  showEvolution("http://www.serebii.net/pokemongo/pokemon/001.png");
  showInfoBoard("http://www.serebii.net/pokemongo/pokemon/001.png");
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
  if (event.target.value === 'a-to-z' || event.target.value === 'z-to-a') {
    sortByName()
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

function getPokemonObjectByImg(img) {
  return (getPokemons().filter((pokemon) => (pokemon["img"] === img)))[0];
}

function getPokemonArrayByImg(img) {
  return (getPokemons().filter((pokemon) => (pokemon["img"] === img)));
}

function getPokemonObjectByNumber(num) {
  return (getPokemons().filter((pokemon) => (pokemon["num"] === num)))[0];
}

function ordena(array) {
  let aux = array.sort(function (a, b) {
    return a.id - b.id;
  })
  return aux;
}

function getPokemonOnClick() {
  let pokemonList = document.querySelectorAll('.pokemon-img');

  for (let pokemon of pokemonList) {
    pokemon.addEventListener('click', function (event) {
      setPokemon(event.target.src);
      showEvolution(event.target.src);
      showInfoBoard(event.target.src);
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
      <h5 class="select-num-pokemon">${poke["num"]}</h5>
      <h4 class="pokemon-name">${poke["name"]}</h4>
      <div class="type-pokemon-panel">${getPokemonType(poke["type"])}</div>
    </div>
    `).join("")}
    `
  getPokemonOnClick();
}

function getPokemonType(type) {
  let value = '';
  for (const key in type) {
    value += '<img class="type-icon" src=../images/icons/' + type[key].toLowerCase() + '.png alt=\"' + type[key] + '\" title=\"' + type[key] + '\">'
  }
  return value;
}

function setPokemon(img) {
  const divImg = document.querySelector('.img-picked-pokemon');
  divImg.innerHTML = `<img src="${img}" class="poke-teste">`
}

function showInfoBoard(pokemon) {
  const divInfo = document.querySelector('.info-picked-pokemon');
  let selectedPokemon = getPokemonObjectByImg(pokemon);

  divInfo.innerHTML = `
    <section class="description-pokemon-card">
      <section class="info-container">
        <h5 class="title-info-name">${selectedPokemon["name"]}</h5>
        <div><h5 class="title-info">Type:</h5><span class="info">${selectedPokemon["type"].join("/")}</span></div>
        <div><h5 class="title-info">Weaknesses:</h5><span class="info">${selectedPokemon["weaknesses"].join(", ")}</span></div>
    </section>
    <section class="info-container">
      <div><h5 class="title-info">Weight:</h5><span class="info">${selectedPokemon["weight"]}</span></div>
      <div><h5 class="title-info">Height:</h5><span class="info">${selectedPokemon["height"]}</span></div>
    </section>
    </section>
    `
}

function showEvolution(pokemon) {
  let evolution = [];
  let prevEvolution = [];
  let nextEvolution = [];
  const divEvolutions = document.querySelector('.evolution-card');

  if (getPokemonObjectByImg(pokemon).prev_evolution) {
    prevEvolution = getPokemonObjectByImg(pokemon).prev_evolution;
    if (prevEvolution.length !== 0) {
      for (let item in prevEvolution) {
        evolution.push(getPokemonObjectByNumber(prevEvolution[item].num))
      }
    }
  }

  if (getPokemonObjectByImg(pokemon).next_evolution) {
    nextEvolution = getPokemonObjectByImg(pokemon).next_evolution;
    if (nextEvolution.length !== 0) {
      for (let item in nextEvolution) {
        evolution.push(getPokemonObjectByNumber(nextEvolution[item].num))
      }
    }
  }

  evolution.push(getPokemonObjectByImg(pokemon))
  evolution = ordena(evolution);

  if (evolution.length > 1) {

    divEvolutions.innerHTML = `  
    ${evolution.map((poke) => `
      <div>
      <img src="${poke["img"]}" class="img-evolutions" />
        <h3 class="name-evolution">${poke["name"]}</h3>
      </div>
      <div class="arrow-evolution">
      <i class="fas fa-arrow-circle-right"></i>
      </div>
      `).join(" ")}
      `
    document.querySelector('.evolutions-pokemons').classList.remove('hidden');

  } else {
    divEvolutions.innerHTML = "";
    document.querySelector('.evolutions-pokemons').classList.add('hidden');
  }
}
