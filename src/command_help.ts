import { CLICommand } from "./command.js";
import { getCommands } from "./repl.js";

export function commandHelp(_commands: Record<string, CLICommand>) {
    let helpMessages: string = "";
    const commands = getCommands();

    for (const command in commands) {
        helpMessages += `\n${commands[command].name}: ${commands[command].description}`;
    }

    console.log(
`Welcome to the Pokedex!
Usage:
${helpMessages}`
); 
}
            
