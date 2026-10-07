const isPalindrome = require('../src/pallendromeDetector.js');

describe('isPalindrome - Input Validation', () => {
    test('should return false for any non-string input', () => {
        expect(isPalindrome(12321)).toBe(false);
        expect(isPalindrome(null)).toBe(false);
        expect(isPalindrome(undefined)).toBe(false);
        expect(isPalindrome(['b', 'o', 'b'])).toBe(false);
        expect(isPalindrome({text: 'bob'})).toBe(false);
        expect(isPalindrome(true)).toBe(false);
    })
})
