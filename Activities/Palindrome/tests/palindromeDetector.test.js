const isPalindrome = require('../src/palindromeDetector.js');
//Input Validation
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
// Basic Words
describe('isPalindrome - Basic Words', () => {
    test('should return true for simple lowercase palindromes', () => {
        expect(isPalindrome('bob')).toBe(true);
        expect(isPalindrome('racecar')).toBe(true);
    });

    test('should return false for non-palindromes',() => {
        expect(isPalindrome('apple')).toBe(false);
    });
});
// Case Handling (outlier)
describe('isPalindrome - Outlier Handling', () => {
    test('should ignore letter cases', () => {
        expect(isPalindrome('Racecar')).toBe(true);
    });
    test('should ignore spaces and punctuation in full phrases', () => {
        expect(isPalindrome("Madam I'm Adam.")).toBe(true);
        expect(isPalindrome("Red rum, sir, is murder.")).toBe(true);
    });
});