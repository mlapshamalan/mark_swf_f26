function isPalindrome(str) {
    if(typeof str !== 'string') {
        return false;
    }

    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversed = cleaned.split('').reverse().join('');

    return cleaned === reversed;
}
module.exports = isPalindrome;