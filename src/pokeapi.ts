export class Pokeapi {
    private static readonly baseUrl = "https://pokeapi.co/api/v2";

    constructor() {};


    async fetchLocations(pageUrl?: string | null): Promise<ShallowLocations> {
        try {
            const response = await fetch(pageUrl ? pageUrl : Pokeapi.baseUrl + "/location-area/");

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            };

            const result = await response.json();
            return {
                count: result["count"],
                next: result["next"],
                previous: result["previous"],
                results: result["results"],
            };

        } catch (err) {
            throw new Error((err as Error).message);
        };
    };


    async fetchLocation(locationName: string): Promise<Location> {
        try {
            const response = await fetch(Pokeapi.baseUrl + "/location-area/" + locationName);

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            };

            const result = await response.json();
            return {
                id: result["id"],
                location: result["location"],
            };

        } catch (err) {
            throw new Error((err as Error).message);
            
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
