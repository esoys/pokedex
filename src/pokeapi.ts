import { Cache } from "./pokecache.js";

export class Pokeapi {
    private static readonly baseUrl = "https://pokeapi.co/api/v2";
    #cache = new Cache(5000);   


    async fetchLocations(pageUrl?: string | null): Promise<ShallowLocations> {
        const locationsUrl = pageUrl ? pageUrl : Pokeapi.baseUrl + "/location-area/";
        const cached = this.#cache.get<ShallowLocations>(locationsUrl);
        if (cached) {
            return cached;
        } else {
            try {
                const response = await fetch(locationsUrl);

                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                };

                const result = await response.json();
                const res = {
                    count: result["count"],
                    next: result["next"],
                    previous: result["previous"],
                    results: result["results"],
                };
                this.#cache.add(locationsUrl, res);

                return res; 

            } catch (err) {
                throw new Error((err as Error).message);
            };
        };
    };


    async fetchLocation(locationName: string): Promise<Location> {
        const locationUrl: string = Pokeapi.baseUrl + "/location-area/" + locationName;
        const cached = this.#cache.get<Location>(locationUrl);
        if (cached) {
            return cached;
        } else {
            try {
                const response = await fetch(locationUrl);

                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                };

                const result = await response.json();
                const res = {
                    id: result["id"],
                    location: result["location"],
                };

                this.#cache.add(locationUrl, res);

                return res;

            } catch (err) {
                throw new Error((err as Error).message);
            };   
        };
    };
};


export type ShallowLocations = {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
        name: string;
        url: string;
    }[];
};


export type Location = {
    id: number;
    location: {
        name: string;
        url: string;
    };
};
