import { createInterface } from "node:readline";
import { Pokeapi } from "./pokeapi.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMapForward, commandMapBackwards } from "./command_map.js";
export function initState() {
    return {
        readline: createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "Pokedex > ",
        }),
        commands: {
            exit: {
                name: "exit",
                description: "Exits the pokedex",
                callback: commandExit,
            },
            help: {
                name: "help",
                description: "Displays a help message",
                callback: commandHelp,
            },
            map: {
                name: "map",
                description: "Displays the next 20 Locations",
                callback: commandMapForward,
            },
            mapb: {
                name: "mapb",
                description: "Displays the previous 20 Locations",
                callback: commandMapBackwards,
            },
        },
        pokeapi: new Pokeapi(),
        nextLocationsURL: null,
        prevLocationsURL: null,
    };
}
;
