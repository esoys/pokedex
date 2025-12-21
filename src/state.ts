import { createInterface, type Interface } from "node:readline";
import { Pokeapi } from "./pokeapi.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMapForward, commandMapBackwards }from "./command_map.js";


export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
};


export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokeapi: Pokeapi;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
};


export function initState(): State {
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
};
