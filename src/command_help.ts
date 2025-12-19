import { type State, type CLICommand } from "./state.js";

export function commandHelp(state: State) {
    let helpMessages: string = "";
    const commands = state.commands;

    for (const command in commands) {
        helpMessages += `\n${commands[command].name}: ${commands[command].description}`;
    }

    console.log(
`Welcome to the Pokedex!
Usage:
${helpMessages}`
); 
}
            
