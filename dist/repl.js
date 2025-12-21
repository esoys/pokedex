export function startREPL(state) {
    const rl = state.readline;
    const commands = state.commands;
    rl.prompt();
    rl.on("line", async (line) => {
        const inputArray = cleanInput(line);
        if (inputArray.length === 0) {
            rl.prompt();
        }
        else {
            const commandName = inputArray[0];
            const command = commands[commandName];
            if (command) {
                try {
                    const response = await command.callback(state);
                }
                catch (err) {
                    console.error(err.message);
                }
                ;
            }
            else {
                console.log("Unknown command");
            }
            rl.prompt();
        }
    });
}
export function cleanInput(input) {
    if (input === "" || input === undefined) {
        return [];
    }
    const strings = input.toLowerCase().split(" ");
    const result = strings.filter((word) => word !== "" && word !== " ");
    return result;
}
