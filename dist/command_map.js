export async function commandMapForward(state) {
    const locations = await state.pokeapi.fetchLocations(state.nextLocationsURL);
    state.prevLocationsURL = locations.previous;
    state.nextLocationsURL = locations.next;
    for (const loc of locations.results) {
        console.log(`${loc.name}`);
    }
    ;
}
export async function commandMapBackwards(state) {
    if (state.prevLocationsURL === null) {
        console.log("you're on the first page");
    }
    else {
        const preLocations = await state.pokeapi.fetchLocations(state.prevLocationsURL);
        state.prevLocationsURL = preLocations.previous;
        state.nextLocationsURL = preLocations.next;
        for (const loc of preLocations.results) {
            console.log(`${loc.name}`);
        }
        ;
    }
    ;
}
