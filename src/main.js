
window.onload = function(){
    showPokemons();
    console.log(filterByType('Grass'));
}

function filterByType(typep){
  const pokemonByType = getPokemons().filter((pokemon) => (pokemon["type"].includes(typep)))
  return pokemonByType;
}

function getPokemons(){
    return POKEMON["pokemon"];
}

function showPokemons(){
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






