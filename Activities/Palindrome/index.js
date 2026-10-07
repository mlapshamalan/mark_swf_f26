const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');
const isPalindrome = require('./src/palindromeDetector.js');

async function startCLI() {
    const rl = readline.createInterface({ input, output });

    console.log('\n🔍 --- Palindrome Detector CLI ---');
    console.log('Type any phrase to test, or type "exit" to quit.\n');

    while (true) {
        const userInput = await rl.question('Enter text: ');

        // Check if user wants to quit
        if (userInput.trim().toLowerCase() === 'exit') {
            console.log('Goodbye! 👋\n');
            rl.close();
            break;
        }

        // Test user input
        const result = isPalindrome(userInput);

        if (result) {
            console.log(`✅ "${userInput}" IS a palindrome!\n`);
        } else {
            console.log(`❌ "${userInput}" is NOT a palindrome.\n`);
        }
    }
}

startCLI();