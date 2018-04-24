const Word = require('./word');
const Letter = require('./letter');
const inquirer = require('inquirer');

var words = ['cat', 'dog', 'frog'];
var selectedWord = words[Math.floor(Math.random() * Math.floor(words.length))];

var wordArray = [];

for(var i = 0; i<selectedWord.length; i++) {
    wordArray.push(new Letter(selectedWord.charAt(i)));
}

word = new Word(wordArray)

var lives = 7;
var guessed = [];

var wordWithGuesses = '';
wordWithGuesses = word.returnString(wordWithGuesses)
console.log( wordWithGuesses + '\t\t\t\tLives: ' + lives);

callPrompt();

function callPrompt() {  
    inquirer.prompt([
        {
            message: 'Guess a letter',
            type: 'input',
            name: 'letter'
        }
    ]).then(function (guess) {  

        if(guessed.indexOf(String(guess.letter)) == -1) {
            
            guessed.push(String(guess.letter));

            word.guessLetter(String(guess.letter));

            wordWithGuesses = word.returnString(wordWithGuesses)

            if(wordWithGuesses.indexOf(guess.letter) == -1) lives--;
        }
        else {
            console.log('Already guessed that!')
        }

        console.log(wordWithGuesses + '\t\t\t\tLives: ' + lives);

        checkIfGuessed(wordWithGuesses);
    });
}

function checkIfGuessed(wordWithGuesses) {

    for(var i = 0; i < wordWithGuesses.length; i++) {

        if(wordWithGuesses.charAt(i) == '_') return callPrompt();
    }
    console.log('YOU WIN!!')
}