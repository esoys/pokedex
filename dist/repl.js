import { createInterface } from "node:readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });
    const commands = getCommands();
    rl.prompt();
    rl.on("line", (line) => {
        const inputArray = cleanInput(line);
        if (inputArray.length === 0) {
            rl.prompt();
        }
        else {
            const commandName = inputArray[0];
            const command = commands[commandName];
            if (command) {
                command.callback(commands);
            }
            else {
                console.log("Unknown command");
            }
            rl.prompt();
        }
    });
}
export function getCommands() {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        }
        // weitere commands
    };
}
export function cleanInput(input) {
    if (input === "" || input === undefined) {
        return [];
    }
    const strings = input.toLowerCase().split(" ");
    const result = strings.filter((word) => word !== "" && word !== " ");
    return result;
}
