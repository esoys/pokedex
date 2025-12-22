import { createInterface, type Interface } from "node:readline";
import { Pokeapi, Pokemon } from "./pokeapi.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMapForward, commandMapBackwards } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";


export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};


export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokedex: Record<string, Pokemon>;
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
            explore: {
                name: "explore",
                description: "Displays pokemon encounters in given areas",
                callback: commandExplore,
            },
            catch: {
                name: "catch",
                description: "Try to catch a pokemon",
                callback: commandCatch,
            },
            inspect: {
                name: "inspect",
                description: "Display stats of caugth pokemon",
                callback: commandInspect,
            },
            pokedex: {
                name: "pokedex",
                description: "Display all caught pokemon",
                callback: commandPokedex,
            },
        },
        pokedex: {},
        pokeapi: new Pokeapi(),
        nextLocationsURL: null,
        prevLocationsURL: null,
    };
};
