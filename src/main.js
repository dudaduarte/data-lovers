window.onload = function () {
  showPokemons(getPokemons());
  setPokemon(arrayResult[0].img);
  showEvolution(arrayResult[0].img);
  showInfoBoard(arrayResult[0].img);
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
    sortByName(event.target.value)
  } else {
    sortByNumber(event.target.value)
  }
})

function getPokemons() {
  arrayResult = POKEMON["pokemon"];
  return arrayResult;
}

function getType() {
  let description = DESCRIPTION["description"];
  return description;
}

function getImages() {
  let images = IMAGES["images"];
  return images
}

function getPokemonDescriptionType(type) {
  return (getType().find((pokemon) => (pokemon["type"] === type)));
}

function getPokemonImage(id) {
  //console.log(getImages().find((pokemon) => (pokemon["id"] === id)));
  return (getImages().find((pokemon) => (pokemon["id"] === id))).src;
}

function filterByType(type) {
  arrayResult = getPokemons().filter((pokemon) => (pokemon["type"].includes(type)));
  showPokemons(arrayResult);
}

function filterByName(input) {
  const filteredByName = getPokemons().filter((pokemon) => (pokemon["name"].toLowerCase().includes(input.toLowerCase())));
  showPokemons(filteredByName);
}

function sortByName(order) {
  arrayResult = (arrayResult.sort((a, b) => a.name.localeCompare(b.name)));
  if (order === 'z-to-a') {
    arrayResult.reverse();
  }
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
  return (getPokemons().find((pokemon) => (pokemon["img"] === img)));
}

function getPokemonArrayByImg(img) {
  return (getPokemons().filter((pokemon) => (pokemon["img"] === img)));
}

function getPokemonObjectByNumber(num) {
  return (getPokemons().find((pokemon) => (pokemon["num"] === num)));
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
      <div class="type-pokemon-panel">${setTypeIcon(poke["type"])}</div>
    </div>
    `).join("")}
    `
  getPokemonOnClick();
}

function setTypeIcon(type) {
  stringType = '';
  for (key in type) {
    stringType +=  '<img class="type-icon" src=../images/icons/' + type[key].toLowerCase() + '.png alt=\"' + type[key] + '\" title=\"' + type[key] + '\">';
  }
  return stringType;
}

function getPokemonType(type) {
  let typeSet = [];
  for (const key in type) {
    typeSet.push(type[key]);
  }
  return typeSet;
}

function setPokemon(img) {
  const divImg = document.querySelector('.img-picked-pokemon');
  let poke = getPokemonObjectByImg(img);
  img = (getPokemonImage(poke.id));

  divImg.innerHTML = `<img src="${img}" class=" ${ parseFloat(poke.height) >= 1 ? 'poke-teste large' : 'poke-teste small'}">`


}

function showInfoBoard(pokemon) {
  const divInfo = document.querySelector('.info-picked-pokemon');
  let selectedPokemon = getPokemonObjectByImg(pokemon);

  divInfo.innerHTML = `
  <section class="description-pokemon-card">
    <div class="title-info-box">
      <h5 class="title-info-name">${selectedPokemon["name"]}</h5>
      ${setTypeDescription(selectedPokemon["type"])}
    </div>
    <section class="info-container">
      <div><h5 class="title-info">Weaknesses:</h5><span class="info">${selectedPokemon["weaknesses"].join(", ")}</span></div>
    </section>
    <section class="info-container">
      <div><h5 class="title-info">Weight:</h5><span class="info">${selectedPokemon["weight"]}</span></div>
      <div><h5 class="title-info">Height:</h5><span class="info">${selectedPokemon["height"]}</span></div>
    </section>
    </section>
  `
  document.querySelector('.description-pokemon-card').classList.add(selectedPokemon["type"][0].toLowerCase());
}

function setTypeDescription(typeArray) {
  stringType = '';
  for (type of typeArray) {
    stringType += '<span class=\"infoinfo\" data-tooltip=\"' + getPokemonDescriptionType(type).desc + '\">' + type.toUpperCase() + '</span>'
  }
  return stringType;
}

function showEvolution(pokemon) {
  let evolution = [];
  let prevEvolution = [];
  let nextEvolution = [];
  const divEvolutions = document.querySelector('.evolution-card');
 
  prevEvolution = getPokemonObjectByImg(pokemon).prev_evolution;
    for (let item in prevEvolution) {
      evolution.push(getPokemonObjectByNumber(prevEvolution[item].num))
    }

  nextEvolution = getPokemonObjectByImg(pokemon).next_evolution;
    for (let item in nextEvolution) {
      evolution.push(getPokemonObjectByNumber(nextEvolution[item].num))
    }
  evolution.push(getPokemonObjectByImg(pokemon))
  evolution = ordena(evolution);

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
}
