window.onload = function() {
    mainPokemonSection();
}

function getPokemons() {
    return POKEMON["pokemon"];
}

function mainPokemonSection() {
    document.querySelector('#select-pokemon').innerHTML = `
    ${getPokemons().map((poke) => `
    <section class="section-select-pokemon">
        <img src="${poke["img"]}" class="select-image-pokemon">
        <div class="select-text">
            <h4 class="select-num-pokemon">${poke["num"]}</h4>
            <h3 class="select-name-pokemon">${poke["name"]}</h3>
            <p class="select-type-pokemon">${poke["type"].join(', ')}</p>
        </div>
    </section>
    `).join("")}
    `
}