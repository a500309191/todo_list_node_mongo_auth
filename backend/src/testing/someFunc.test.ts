import {expect, test} from "@jest/globals"
import { addNumbers } from "./someFunc"

test('two plus two is equal four', () => {
    expect(addNumbers(2,2)).toBe(4);
})