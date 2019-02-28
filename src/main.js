
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
  const filteredByName = arrayResult.filter((pokemon) => (pokemon["name"].toLowerCase().includes(input.toLowerCase())));
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

function getPokemonOnClik() {
  let pokemonList = document.querySelectorAll('.pokemon-img');
  for (let pokemon of pokemonList) {
    pokemon.addEventListener('click', function (event) {
      setPokemon(event.target.src);
    })
  }
}

function setPokemon(img) {
  let pickedPokemon = document.querySelector('.picked');
  let div = document.querySelector('.picked-pokemon');

  div.innerHTML = "";

  let image = document.createElement("img");
  image.src = img;

  image.classList.add("poke-teste");

  div.appendChild(image);
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


