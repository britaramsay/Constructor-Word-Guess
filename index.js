const Word = require('./word');
const Letter = require('./letter');
const inquirer = require('inquirer');
const request = require('request');

var words = [],
    lives = 7,
    guessed = [],
    wordWithGuesses = '';

newGame();

function newGame() { 
    // Promp to get user to pick a topic
    inquirer.prompt([
        {
            message: 'Choose a category.',
            type: 'list',
            choices: ['ocean', 'animal', 'country', 'yellow'],
            name: 'choice'
        }
    ]).then(function (answer) {  
        // Use datamuse api to get words related to the option they chose
        request('https://api.datamuse.com/words?topics='+answer.choice+'&max=6', function (err, res, body) {  
            JSON.parse(body).forEach(element => {
                // push each word to an array
                words.push(element.word)
            })
            // Randomly choose a word from the array
            var selectedWord = words[Math.floor(Math.random() * Math.floor(words.length))];

            var wordArray = [];
            // For each letter in the selected word
            for(var i = 0; i<selectedWord.length; i++) {
                // Make a new letter with the Letter constructor and push it to wordArray 
                wordArray.push(new Letter(selectedWord.charAt(i)));
            }
            // User Word constructor to make a new Word with the array of letters
            word = new Word(wordArray)
        
            lives = 7;
            guessed = [];
            
            wordWithGuesses = '';
            // Return a string of underscores
            wordWithGuesses = word.returnString(wordWithGuesses)
            console.log( wordWithGuesses + '\t\t\t\tLives: ' + lives);
            // Call promp to ask user to guess letters
            callPrompt();
        })
    })
}

function callPrompt() {  
    inquirer.prompt([
        {
            message: 'Guess a letter',
            type: 'input',
            name: 'letter'
        }
    ]).then(function (guess) {  
        // If they have not already guessed this letter
        if(guessed.indexOf(String(guess.letter)) == -1) {
            // Push it to guesses
            guessed.push(String(guess.letter));
            // Call guessLetter function with this letter
            word.guessLetter(String(guess.letter));
            // Return string of underscores and letter guessed if it was in the word
            wordWithGuesses = word.returnString(wordWithGuesses)
            // If the letter was not in the word
            if(wordWithGuesses.indexOf(guess.letter) == -1) {
                // Decrement lives
                lives--;
                // If they used all their lives
                if(lives == 0 ) {
                    console.log('YOU LOSE!')
                    // Ask to start a new game
                    askToPlayAgain();
                }
            }
        }
        else {
            // Tell user if the letter was already guessed
            console.log('Already guessed that!')
        }
        // Display the word with correct guesses
        console.log(wordWithGuesses + '\t\t\t\tLives: ' + lives);
        // Check if they have guessed all letters
        checkIfGuessed(wordWithGuesses);
    });
}

function checkIfGuessed(wordWithGuesses) {
    // Loop through each character in the underscore word
    for(var i = 0; i < wordWithGuesses.length; i++) {
        // If an underscore is in the word, call the prompt again
        if(wordWithGuesses.charAt(i) == '_') return callPrompt();
    }
    // If there are no underscores, they won
    console.log('YOU WIN!!')
    // Ask them to play again
    askToPlayAgain();
}

function askToPlayAgain() {  
    // Ask them to play again
    inquirer.prompt([
        {
            message: 'Play Again?',
            type: 'list',
            choices: ['Yes', 'No'],
            name: 'again'
        }
    ]).then(function (answer) {  
        // Call newGame if they answered yes
        if(answer.again == 'Yes') newGame();
        // Otherwise app will stop
    })
}