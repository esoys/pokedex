import { type CLICommand, type State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
    const name = args[0];
    
    console.log(`Exploring ${name}`);
    const area = await state.pokeapi.fetchLocationArea(name);

    console.log("Pokemon found:")
    for (const poc of area.pokemon_encounters) {
        console.log(` - ${poc.pokemon.name}`);
    };
} 
