window.onload = function () {
  showPokemons();
  getPokemonOnClik();
}


function getPokemonOnClik (){
  let pokemonList = document.querySelectorAll('.pokemon-img');

  for(let pokemon of pokemonList){
    pokemon.addEventListener('click', function(event){
      console.log(event.target.src);
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
    getPokemonOnClik();
  })
  
}

document.querySelector('#input-name-pokemon').addEventListener('input', function(event) {
  searchName(event.target.value);
});

function getPokemons() {
  return POKEMON["pokemon"];
}

function showPokemons() {
  let pokemonDiv = document.querySelector('#pokemon-div');

  pokemonDiv.innerHTML = `  
  ${getPokemons().map((poke) => `
  <div class="single-pokemon">
    <img src="${poke["img"]}"
    class="pokemon-img" />
      <h4 class="select-num-pokemon">${poke["num"]}</h4>
      <h3 class="pokemon-name">${poke["name"]}</h3>
      <p class="select-type-pokemon">${poke["type"].join(', ')}</p>
    </div>
    `).join("")}
    `
}

function filterByType(typep) {
  const filter = getPokemons().filter((pokemon) => (pokemon["type"].includes(typep)));
  showFilter(filter);
}

function showFilter(filter) {
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


}

function searchName(input) {
  const filterName = getPokemons().filter((pokemon) => (pokemon["name"].toLowerCase().includes(input.toLowerCase())));
  showFilter(filterName);
}


function setPokemon (img){
  let pickedPokemon = document.querySelector('.picked');
  let div = document.querySelector('.picked-pokemon');

  div.innerHTML = "";
  /*
  if(!pickedPokemon.src){
    pickedPokemon.src = img;
  }
  else{
    pickedPokemon.removeAttribute(src);
  }
*/

  let image = document.createElement("img");
  image.src=img;

  image.classList.add("poke-teste");

  div.appendChild(image);

  
}