const Word = require('./word');
const Letter = require('./letter');
const inquirer = require('inquirer');
var request = require('request');

var words = [],
    lives = 7,
    guessed = [],
    wordWithGuesses = '';

newGame();

function newGame() { 
    
    inquirer.prompt([
        {
            message: 'Choose a category.',
            type: 'list',
            choices: ['ocean', 'animal', 'country'],
            name: 'choice'
        }
    ]).then(function (answer) {  

        request('https://api.datamuse.com/words?topics='+answer.choice+'&max=4', function (err, res, body) {  
            JSON.parse(body).forEach(element => {
                // console.log(element.word)
                words.push(element.word)
            })
            var selectedWord = words[Math.floor(Math.random() * Math.floor(words.length))];

            var wordArray = [];
        
            for(var i = 0; i<selectedWord.length; i++) {
                wordArray.push(new Letter(selectedWord.charAt(i)));
            }
        
            word = new Word(wordArray)
        
            lives = 7;
            guessed = [];
            
            wordWithGuesses = '';
        
            wordWithGuesses = word.returnString(wordWithGuesses)
            console.log( wordWithGuesses + '\t\t\t\tLives: ' + lives);
            
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

        if(guessed.indexOf(String(guess.letter)) == -1) {
            
            guessed.push(String(guess.letter));

            word.guessLetter(String(guess.letter));

            wordWithGuesses = word.returnString(wordWithGuesses)

            if(wordWithGuesses.indexOf(guess.letter) == -1) {
                lives--;
                if(lives == 0 ) {
                    console.log('YOU LOSE!')
                    askToPlayAgain();
                }
            }
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
    askToPlayAgain();
}

function askToPlayAgain() {  
    inquirer.prompt([
        {
            message: 'Play Again?',
            type: 'list',
            choices: ['Yes', 'No'],
            name: 'again'
        }
    ]).then(function (answer) {  
        if(answer.again == 'Yes') newGame();
    })
}