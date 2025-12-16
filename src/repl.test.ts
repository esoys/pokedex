import { cleanInput } from "./repl";
import { describe, expect, test } from "vitest";

describe.each([
    {
        input: "   hello   World  ",
        expected: ["hello", "world"],
    },
    {
        input: "JOOjo! wa s geHt?",
        expected: ["joojo!", "wa", "s", "geht?"],
    },
    {
        input: ".. hahah ! : has HA",
        expected: ["..", "hahah", "!", ":", "has", "ha"],
    },
    {
        input: "",
        expected: [],
    },
])("cleanInput($input)", ({ input, expected }) => {
        test(`Expected: ${expected}`, () => {
            const actual = cleanInput(input);

            expect(actual).toHaveLength(expected.length);
            for (const i in expected) {
                expect(actual[i]).toBe(expected[i]);
            }
        });
    });
