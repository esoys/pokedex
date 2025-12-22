import { State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
    console.log("Your Pokedex:")
    for (const [key, value] of Object.entries(state.pokedex)) {
        console.log(`  - ${key}`);
    };
}
