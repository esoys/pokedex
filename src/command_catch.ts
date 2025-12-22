import { type CLICommand, type State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
    const name = args[0];
    
    console.log(`Throwing a Pokeball at ${name}...`);
    const pokemon = await state.pokeapi.fetchPokemon(name);
    
    const catchChance = 0.6 - (pokemon.baseExperience / 1000);

    const catchAttempt = Math.random() * (1 - 0.15) + 0.15;

    if (catchAttempt < catchChance) {
        console.log(`${pokemon.name} was caught!`);
        state.pokedex[pokemon.name] = pokemon;
    } else {
        console.log(`${pokemon.name} escaped!`);
    };
} 
