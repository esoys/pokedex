import { type CLICommand, type State } from "./state.js";


export async function commandExit(state: State): Promise<void> {
    state.readline.close();
    console.log("Closing the Pokedex... Goodbye!");
    process.exit(0);
}
