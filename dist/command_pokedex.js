export async function commandPokedex(state) {
    console.log("Your Pokedex:");
    for (const [key, value] of Object.entries(state.pokedex)) {
        console.log(`  - ${key}`);
    }
    ;
}
