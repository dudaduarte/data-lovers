window.onload = function(){
    showPokemons();
}

function getPokemons(){
    return POKEMON["pokemon"];
}


function showPokemons(){
    let pokemonDiv = document.querySelector('#pokemon-div');
  
    // crases:  itens dentro das crases fazem parte do template string
    //produto é o parametro que veio de data.json
  
    pokemonDiv.innerHTML = `  
    ${getPokemons().map((poke) => `
    <div class="single-pokemon">
      <img src="${poke["img"]}"
      class="pokemon-img" />
        <h4 class="select-num-pokemon">${poke["num"]}</h4>
        <h3 class="product-name">${poke["name"]}</h3>
        <p class="select-type-pokemon">${poke["type"].join(', ')}</p>
      </div>
      `).join("")}
      `
   }