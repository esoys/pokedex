import { Cache } from "./pokecache.js";
export class Pokeapi {
    static baseUrl = "https://pokeapi.co/api/v2";
    #cache = new Cache(5000);
    async fetchLocations(pageUrl) {
        const locationsUrl = pageUrl ? pageUrl : Pokeapi.baseUrl + "/location-area/";
        const cached = this.#cache.get(locationsUrl);
        if (cached) {
            return cached;
        }
        else {
            try {
                const response = await fetch(locationsUrl);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                ;
                const result = await response.json();
                const res = {
                    count: result["count"],
                    next: result["next"],
                    previous: result["previous"],
                    results: result["results"],
                };
                this.#cache.add(locationsUrl, res);
                return res;
            }
            catch (err) {
                throw new Error(err.message);
            }
            ;
        }
        ;
    }
    ;
    async fetchLocation(locationName) {
        const locationUrl = Pokeapi.baseUrl + "/location-area/" + locationName;
        const cached = this.#cache.get(locationUrl);
        if (cached) {
            return cached;
        }
        else {
            try {
                const response = await fetch(locationUrl);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                ;
                const result = await response.json();
                const res = {
                    id: result["id"],
                    location: result["location"],
                };
                this.#cache.add(locationUrl, res);
                return res;
            }
            catch (err) {
                throw new Error(err.message);
            }
            ;
        }
        ;
    }
    ;
    async fetchLocationArea(locationName) {
        const locationUrl = Pokeapi.baseUrl + "/location-area/" + locationName;
        const cached = this.#cache.get(locationUrl);
        if (cached) {
            return cached;
        }
        else {
            try {
                const response = await fetch(locationUrl);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                ;
                const result = await response.json();
                const res = {
                    id: result["id"],
                    location: result["location"],
                    pokemon_encounters: result["pokemon_encounters"],
                };
                this.#cache.add(locationUrl, res);
                return res;
            }
            catch (err) {
                throw new Error(err.message);
            }
            ;
        }
        ;
    }
    async fetchPokemon(pokemonName) {
        const pokemonUrl = Pokeapi.baseUrl + "/pokemon/" + pokemonName;
        const cached = this.#cache.get(pokemonUrl);
        if (cached) {
            return cached;
        }
        else {
            try {
                const response = await fetch(pokemonUrl);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                ;
                const result = await response.json();
                const res = {
                    id: result["id"],
                    name: result["name"],
                    height: result["height"],
                    weight: result["weight"],
                    stats: {
                        hp: result["stats"][0]["base_stat"],
                        attack: result["stats"][1]["base_stat"],
                        defense: result["stats"][2]["base_stat"],
                        specialAttack: result["stats"][3]["base_stat"],
                        specialDefense: result["stats"][4]["base_stat"],
                        speed: result["stats"][5]["base_stat"],
                    },
                    types: result["types"],
                    baseExperience: result["base_experience"],
                };
                this.#cache.add(pokemonUrl, res);
                return res;
            }
            catch (err) {
                throw new Error(err.message);
            }
            ;
        }
        ;
    }
}
;
