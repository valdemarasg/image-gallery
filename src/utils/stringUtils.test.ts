import { expect, test, describe } from 'vitest';
import { truncateString } from './stringUtils';

describe('truncate string ', () => {
    test('"random string" should return "random string"', () => {
        expect(truncateString("random string")).toBe("random string");
    })

    test('strings over 30 symbols by default should be truncated and dots added "', () => {
        expect(truncateString("Lorem Ipsum is simply dummy text of the printing and typesetting industry.")).toBe("Lorem Ipsum is simply dummy te...");
    })

    test('strings should be truncated if exceeds given number symbols and dots added "', () => {
        expect(truncateString("Lorem Ipsum is simply dummy text of the printing.", 5)).toBe("Lorem...");
    })

    test('empty string input should return empty string if default value not given"', () => {
        expect(truncateString("")).toBe("");
    })

    test('empty sting inputr should return default value if its given"', () => {
        expect(truncateString("", 20, "DefaultValue")).toBe("DefaultValue");
    })
})
