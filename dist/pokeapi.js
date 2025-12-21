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
}
;
