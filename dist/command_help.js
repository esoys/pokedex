export async function commandHelp(state) {
    let helpMessages = "";
    const commands = state.commands;
    for (const command in commands) {
        helpMessages += `\n${commands[command].name}: ${commands[command].description}`;
    }
    console.log(`Welcome to the Pokedex!
Usage:
${helpMessages}`);
}
