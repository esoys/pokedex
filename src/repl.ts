import { createInterface } from "node:readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { type CLICommand, type State } from "./state.js";


export function startREPL(state: State) {
    const rl = state.readline;
    const commands = state.commands;

    rl.prompt();

    rl.on("line", async (line: string) => {
        const inputArray = cleanInput(line);
        if (inputArray.length === 0) {
            rl.prompt();
        } else {

            const commandName: string = inputArray[0];
            const args: string[] = inputArray.slice(1);

            const command: CLICommand | undefined = commands[commandName];
            
            if (command) {
                try {
                    await command.callback(state, ...args);
                } catch (err) {
                    console.error((err as Error).message);
                };

            } else {
                console.log("Unknown command");
            }

            rl.prompt();
        }
    });
}

export function cleanInput(input: string): string[] {
    if (input === "" || input === undefined) {
        return [];
    }
    const strings: string[] = input.toLowerCase().split(" ");
    const result: string[] = strings.filter((word) => word !== "" && word !== " ");
    return result;
}
