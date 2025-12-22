export async function commandInspect(state, ...args) {
    const userInput = args[0];
    const pokemon = state.pokedex[userInput];
    if (pokemon) {
        console.log(`Name: ${pokemon.name}
Height: ${pokemon.height}
Weight: ${pokemon.weight}
Stats:
  -hp: ${pokemon.stats.hp}
  -attack: ${pokemon.stats.attack}
  -defense: ${pokemon.stats.defense}
  -special-attack: ${pokemon.stats.specialAttack}
  -special-defense ${pokemon.stats.specialDefense}
  -speed: ${pokemon.stats.speed}
Types:`);
        for (const type of pokemon.types) {
            console.log(`  - ${type.type.name}`);
        }
        ;
    }
    else {
        console.log("you have not caught that pokemon");
    }
    ;
}
