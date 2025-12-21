export class Pokeapi {
    static baseUrl = "https://pokeapi.co/api/v2";
    constructor() { }
    ;
    async fetchLocations(pageUrl) {
        try {
            const response = await fetch(pageUrl ? pageUrl : Pokeapi.baseUrl + "/location-area/");
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            ;
            const result = await response.json();
            return {
                count: result["count"],
                next: result["next"],
                previous: result["previous"],
                results: result["results"],
            };
        }
        catch (err) {
            throw new Error(err.message);
        }
        ;
    }
    ;
    async fetchLocation(locationName) {
        try {
            const response = await fetch(Pokeapi.baseUrl + "/location-area/" + locationName);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            ;
            const result = await response.json();
            return {
                id: result["id"],
                location: result["location"],
            };
        }
        catch (err) {
            throw new Error(err.message);
        }
        ;
    }
    ;
}
;
