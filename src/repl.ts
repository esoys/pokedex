export function cleanInput(input: string): string[] {
    if (input === "") {
        return [];
    }
    const strings: string[] = input.toLowerCase().split(" ");
    const result: string[] = strings.filter((word) => word !== "" && word !== " ");
    return result;
}
