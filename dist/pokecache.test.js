import { Cache } from "./pokecache.js";
import { test, expect } from "vitest";
test.concurrent.each([
    {
        key: "https://example.com",
        val: "testdata",
        interval: 500,
    },
    {
        key: "https://example.com/path",
        val: "moretestdata",
        interval: 1000,
    },
    {
        key: "https://pokeapi.co/api/v2/location-area/canalave-city-area",
        val: {
            id: 1,
            location: {
                name: "canalave-city",
                url: "https://pokeapi.co/api/v2/location/1/"
            }
        },
        interval: 300,
    }
])("Test Caching $interval ms", async ({ key, val, interval }) => {
    const cache = new Cache(interval);
    cache.add(key, val);
    const cached = cache.get(key);
    expect(cached).toBe(val);
    await new Promise((resolve) => setTimeout(resolve, interval * 3));
    const reaped = cache.get(key);
    expect(reaped).toBe(undefined);
    cache.stopReapLoop();
});
