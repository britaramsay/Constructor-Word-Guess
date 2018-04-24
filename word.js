var Letter = require('./letter.js');

function Word (wordArray) {  
    this.word = wordArray;
    this.returnString = function(wordWithGuesses) {
        wordWithGuesses = '';
        this.word.forEach(element => {
            wordWithGuesses += element.returnGuessed();
        });
        return wordWithGuesses;
    }
    this.guessLetter = function (guess) {  

        this.word.forEach(element => {
            element.check(guess); 
        });
    }
}

module.exports = Word;